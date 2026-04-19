import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import uvicorn
from dotenv import load_dotenv

import prediction
from database import log_prediction

load_dotenv()

app = FastAPI(title="Goat Ready Mutton Predictor API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class WeightInput(BaseModel):
    live_weight: float
    breed: str
    gender: str
    age: str
    feed: str
    fat: str

class DimensionInput(BaseModel):
    heart_girth: float
    body_length: float
    breed: str
    gender: str
    age: str
    feed: str
    fat: str

@app.get("/")
async def root():
    return {"message": "Goat Ready Mutton Predictor API is running"}

@app.post("/predict-weight")
async def predict_by_weight(data: WeightInput):
    result = prediction.calculate_mutton_weight(
        data.live_weight, data.breed, data.gender, data.age, data.feed, data.fat
    )
    
    # Log to DB
    log_prediction("weight", data.model_dump(), result)
    
    return {
        "status": "success",
        "input": data,
        "result": result
    }

@app.post("/predict-measurements")
async def predict_by_measurements(data: DimensionInput):
    live_weight = prediction.predict_weight_by_dimensions(data.heart_girth, data.body_length)
    result = prediction.calculate_mutton_weight(
        live_weight, data.breed, data.gender, data.age, data.feed, data.fat
    )
    
    # Log to DB
    log_prediction("measurements", data.model_dump(), result)
    
    return {
        "status": "success",
        "predicted_live_weight": live_weight,
        "result": result
    }

@app.post("/predict-image")
async def predict_by_image(
    file: UploadFile = File(...),
    breed: str = Form("Local breed"),
    gender: str = Form("Male"),
    age: str = Form("12 to 24 months"),
    feed: str = Form("Normal"),
    fat: str = Form("Medium")
):
    try:
        contents = await file.read()
        # Simulated AI processing
        ai_result = prediction.simulate_image_detection(contents)
        
        # Calculate mutton weight based on AI's predicted live weight
        result = prediction.calculate_mutton_weight(
            ai_result["predicted_live_weight"], breed, gender, age, feed, fat
        )
        
        # Log to DB
        log_data = {"breed": breed, "gender": gender, "age": age, "feed": feed, "fat": fat}
        log_prediction("image", log_data, result)
        
        return {
            "status": "success",
            "ai_analysis": ai_result,
            "result": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image processing failed: {str(e)}")

@app.get("/history")
async def get_history():
    from database import get_recent_history
    try:
        history = get_recent_history()
        return {"history": history}
    except Exception as e:
        print(f"Error fetching history: {e}")
        return {"history": []}

@app.delete("/history")
async def clear_history():
    from database import clear_all_history
    success = clear_all_history()
    if success:
        return {"status": "success", "message": "History cleared"}
    raise HTTPException(status_code=500, detail="Failed to clear history")

@app.delete("/history/{item_id}")
async def delete_item(item_id: int):
    from database import delete_history_item
    success = delete_history_item(item_id)
    if success:
        return {"status": "success", "message": f"Item {item_id} deleted"}
    raise HTTPException(status_code=500, detail="Failed to delete item")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
