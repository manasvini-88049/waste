from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np 
from tensorflow.keras.models import load_model
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/")
def home():
    return {"message": "Hello from backend"}

@app.route("/upload", methods=['POST'])
def upload():
    file = request.files['file']
    file.save('uploads/' + file.filename)

    # Load the image to predict
    img_path = f"./uploads/{file.filename}"
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.reshape(img, [-1, 224, 224,3])
    """x = np.expand_dims(x, axis=0)"""
    """x /= 255"""

    loaded_model = load_model(r'C:\Users\jalaj\OneDrive\Desktop\manna_work\minor_project-3\project\waste_model.keras')

    # Make the prediction
    prediction = loaded_model.predict(x)
    if os.path.exists(f"./uploads/{file.filename}"):
        os.remove(f"uploads/{file.filename}")
        
    if prediction ==1:
        return jsonify({"message": "biodegradable waste This goes into green dustbin"})
    else:
        return jsonify({"message": "Non biodegradable waste This goes into blue dustbin"})


if __name__ == '__main__':
    app.run(debug=True)