import numpy as np
import librosa
import librosa.display
import tensorflow as tf
import matplotlib.pyplot as plt
import json
import sys
import os
import time
import traceback

# ==============================
# MODEL LOADING SECTION
# ==============================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = r"C:\AIModelBackup\respiratory_disease_model.keras"

print("Loading model...")

if not os.path.exists(MODEL_PATH):
    print(json.dumps({"error": f"Model file not found at {MODEL_PATH}"}))
    sys.exit(1)

try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print(f"Model loaded successfully from {MODEL_PATH}")
except Exception as e:
    print(json.dumps({"error": f"Error loading model: {str(e)}"}))
    sys.exit(1)

# ==============================
# LABEL AND ACTION MAPS
# ==============================
label_map = {
    0: "COPD",
    1: "Healthy",
    2: "URTI",
    3: "Bronchiectasis",
    4: "Pneumonia",
    5: "Bronchiolitis",
    6: "Asthma",
    7: "LRTI"
}

actions_map = {
    0: "Consult a pulmonologist, avoid smoking, and use prescribed inhalers.",
    1: "No action needed. Maintain a healthy lifestyle and get regular check-ups.",
    2: "Stay hydrated, rest, and use over-the-counter medications if needed. Consult a doctor if symptoms persist.",
    3: "Seek medical advice for antibiotics and airway clearance therapy. Avoid infections and lung irritants.",
    4: "Immediate medical attention required. Take prescribed antibiotics and rest. Hospitalization may be needed for severe cases.",
    5: "Common in infants. Monitor breathing and provide supportive care. Seek medical attention if severe.",
    6: "Use prescribed inhalers, avoid triggers (dust, smoke, allergens), and follow up with a doctor for long-term management.",
    7: "Drink fluids, rest, and take prescribed medications. Seek medical help if symptoms worsen."
}

# ==============================
# FEATURE EXTRACTION
# ==============================
def extract_features(audio_path):
    print(f"Loading audio: {audio_path}")
    try:
        y, sr = librosa.load(audio_path, sr=22050)
    except Exception as e:
        print(json.dumps({"error": f"Failed to load audio file: {str(e)}"}))
        sys.exit(1)

    print(f"Audio loaded: {len(y)} samples at {sr} Hz")

    try:
        mfccs = np.mean(librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40), axis=1)
        mel = np.mean(librosa.feature.melspectrogram(y=y, sr=sr), axis=1)
        features = np.concatenate((mfccs, mel))
    except Exception as e:
        print(json.dumps({"error": f"Feature extraction failed: {str(e)}"}))
        sys.exit(1)

    return features, y, sr

# ==============================
# VISUALIZATION HELPERS
# ==============================
def save_spectrogram_images(y, sr, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    mel_path = os.path.join(output_dir, f"mel_spectrogram{int(time.time())}.png")

    try:
        plt.figure(figsize=(10, 4))
        S = librosa.feature.melspectrogram(y=y, sr=sr)
        S_db = librosa.power_to_db(S, ref=np.max)
        librosa.display.specshow(S_db, x_axis="time", y_axis="mel", sr=sr)
        plt.colorbar(format="%+2.0f dB")
        plt.title("Mel Spectrogram")
        plt.savefig(mel_path)
        plt.close()
    except Exception as e:
        print(f"Warning: Failed to save spectrogram: {e}")

    return mel_path.replace("\\", "/")

def generate_confidence_chart(top_5, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    chart_path = os.path.join(output_dir, f"confidence_chart{int(time.time())}.png")

    try:
        diseases = [item["disease"] for item in top_5]
        confidences = [item["confidence"] for item in top_5]

        plt.figure(figsize=(8, 6))
        plt.barh(diseases, confidences, color='skyblue')
        plt.xlabel("Confidence (%)")
        plt.ylabel("Diseases")
        plt.title("Confidence Levels for Top 5 Diseases")
        plt.gca().invert_yaxis()
        plt.savefig(chart_path)
        plt.close()
    except Exception as e:
        print(f"Warning: Failed to save confidence chart: {e}")

    return chart_path.replace("\\", "/")

# ==============================
# PREDICTION FUNCTION
# ==============================
def predict_disease(audio_path):
    print("Starting prediction pipeline...")
    features, y, sr = extract_features(audio_path)

    try:
        features = features.reshape(1, -1, 1)
        probabilities = model.predict(features)[0]
    except Exception as e:
        print(json.dumps({"error": f"Model prediction failed: {str(e)}"}))
        sys.exit(1)

    sorted_indices = np.argsort(probabilities)[::-1]
    top_5 = [
        {"disease": label_map[idx], "confidence": round(float(probabilities[idx] * 100), 2)}
        for idx in sorted_indices[:5]
    ]

    top_disease_index = sorted_indices[0]
    top_disease = label_map[top_disease_index]
    top_disease_action = actions_map[top_disease_index]

    mel_img = save_spectrogram_images(y, sr, "outputs")
    confidence_chart = generate_confidence_chart(top_5, "outputs")

    timestamp = int(time.time())
    mel_img_with_timestamp = f"{mel_img}?t={timestamp}"
    confidence_chart_with_timestamp = f"{confidence_chart}?t={timestamp}"

    audio_duration = round(len(y) / sr, 2)
    frequency_range = f"{np.min(y):.2f} Hz to {np.max(y):.2f} Hz"

    preventive_measures = [
        "Avoid smoking and exposure to pollutants.",
        "Stay hydrated and maintain a healthy diet.",
        "Exercise regularly to improve lung capacity.",
        "Get regular check-ups and vaccinations."
    ]

    summary = (
        f"The most likely condition is {top_disease} "
        f"with a confidence of {top_5[0]['confidence']}%. "
        f"Immediate action: {top_disease_action}"
    )

    encouraging_message = (
        "Thank you for using our service! Early detection and action can make a big difference in your health."
    )

    response = {
        "summary": summary,
        "top_5_diseases": top_5,
        "top_disease_action": top_disease_action,
        "mel_spectrogram_image": mel_img_with_timestamp,
        "confidence_chart": confidence_chart_with_timestamp,
        "audio_analysis": {
            "duration": f"{audio_duration} seconds",
            "frequency_range": frequency_range
        },
        "preventive_measures": preventive_measures,
        "encouraging_message": encouraging_message
    }

    print("Prediction complete.")
    return response

# ==============================
# MAIN EXECUTION
# ==============================
if __name__ == "__main__":
    try:
        if len(sys.argv) < 2:
            print(json.dumps({"error": "No audio path provided"}))
            sys.exit(1)

        audio_path = sys.argv[1]
        print(f"Received audio path: {audio_path}")

        if not os.path.exists(audio_path):
            print(json.dumps({"error": f"Audio file not found: {audio_path}"}))
            sys.exit(1)

        prediction_result = predict_disease(audio_path)
        print(json.dumps(prediction_result))

    except Exception as e:
        print(json.dumps({"error": f"Unhandled exception: {str(e)}", "trace": traceback.format_exc()}))
        sys.exit(1)
