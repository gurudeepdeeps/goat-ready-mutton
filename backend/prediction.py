import math

# Breed Adjustments
BREED_ADJUSTMENTS = {
    "Local breed": 0,
    "Boer cross": 3,
    "Jamunapari": 2,
    "Osmanabadi": 1.5,
    "Sirohi": 2,
    "Other": 0
}

# Gender Adjustments
GENDER_ADJUSTMENTS = {
    "Male": 1.5,
    "Female": 0,
    "Castrated male": 2
}

# Age Adjustments
AGE_ADJUSTMENTS = {
    "Below 6 months": -4,
    "6 to 12 months": -1,
    "12 to 24 months": 2,
    "2 to 5 years": 1,
    "Above 5 years": -2
}

# Feed Adjustments
FEED_ADJUSTMENTS = {
    "Empty stomach": -2,
    "Normal": 0,
    "Full stomach": 1
}

# Fat Adjustments
FAT_ADJUSTMENTS = {
    "Lean": -3,
    "Medium": 0,
    "Fat": 3
}

def calculate_mutton_weight(live_weight, breed, gender, age, feed, fat):
    base_dp = 48
    
    final_dp = (
        base_dp + 
        BREED_ADJUSTMENTS.get(breed, 0) + 
        GENDER_ADJUSTMENTS.get(gender, 0) + 
        AGE_ADJUSTMENTS.get(age, 0) + 
        FEED_ADJUSTMENTS.get(feed, 0) + 
        FAT_ADJUSTMENTS.get(fat, 0)
    )
    
    mutton_weight = live_weight * (final_dp / 100)
    
    # Range Estimation (subtle variance)
    min_estimate = mutton_weight * 0.96
    max_estimate = mutton_weight * 1.04
    confidence = 92 if breed != "Other" else 85
    
    return {
        "estimated_mutton": round(mutton_weight, 2),
        "min_range": round(min_estimate, 2),
        "max_range": round(max_estimate, 2),
        "confidence_score": confidence,
        "dressing_percentage": round(final_dp, 2)
    }

def predict_weight_by_dimensions(heart_girth, body_length):
    # Live Weight = (Heart Girth^2 * Body Length) / 10838
    live_weight = (heart_girth * heart_girth * body_length) / 10838
    return round(live_weight, 2)

def simulate_image_detection(image_bytes):
    # Future YOLOv8 integration placeholder
    # Simulating detection of body dimensions
    # For simulation, we return fixed typical values or semi-random based on "processing"
    import random
    
    # In a real scenario, this would call YOLOv8 to get bounding boxes and then estimate dimensions
    simulated_length = random.uniform(60, 90)
    simulated_girth = random.uniform(55, 85)
    
    live_weight = predict_weight_by_dimensions(simulated_girth, simulated_length)
    
    return {
        "detected_length_cm": round(simulated_length, 2),
        "detected_girth_cm": round(simulated_girth, 2),
        "predicted_live_weight": live_weight
    }
