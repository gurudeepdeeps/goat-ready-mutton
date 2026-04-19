import sqlite3
import json
import os
from datetime import datetime

DB_PATH = "history.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS prediction_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prediction_type TEXT,
            input_json TEXT,
            result_json TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

# Initialize DB on load
init_db()

def log_prediction(type, input_data, result_data):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO prediction_history (prediction_type, input_json, result_json)
            VALUES (?, ?, ?)
        ''', (type, json.dumps(input_data), json.dumps(result_data)))
        conn.commit()
        conn.close()
        print(f"Log saved to SQLite: {type}")
    except Exception as e:
        print(f"Error logging to SQLite: {e}")

def get_recent_history(limit=20):
    try:
        conn = sqlite3.connect(DB_PATH)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('''
            SELECT * FROM prediction_history
            ORDER BY created_at DESC
            LIMIT ?
        ''', (limit,))
        rows = cursor.fetchall()
        conn.close()
        
        history = []
        for row in rows:
            history.append({
                "id": row["id"],
                "prediction_type": row["prediction_type"],
                "input_json": json.loads(row["input_json"]),
                "result_json": json.loads(row["result_json"]),
                "created_at": row["created_at"]
            })
        return history
    except Exception as e:
        print(f"Error fetching SQLite history: {e}")
        return []

def clear_all_history():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM prediction_history')
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error clearing history: {e}")
        return False

def delete_history_item(item_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute('DELETE FROM prediction_history WHERE id = ?', (item_id,))
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error deleting item {item_id}: {e}")
        return False

