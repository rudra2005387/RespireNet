"""
Brain Tumor Classification Model - Prediction Script
This script loads the trained hybrid CNN-ResNet50 model and performs predictions on brain MRI images.
Categories: Glioma, Meningioma, No Tumor, Pituitary
"""

import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input
import os
import sys
from pathlib import Path


class BrainTumorClassifier:
    """Brain Tumor Classification using Hybrid CNN-ResNet50"""
    
    def __init__(self, model_path='hybrid_cnn_resnet50_best.h5'):
        """
        Initialize the classifier with the trained model.
        
        Args:
            model_path (str): Path to the trained model file
        """
        self.model_path = model_path
        self.model = None
        self.class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']
        self.img_size = (128, 128)  # Model input size
        
        self.load_model()
    
    def load_model(self):
        """Load the trained model from disk"""
        try:
            print(f"Loading model from {self.model_path}...")
            self.model = keras.models.load_model(self.model_path)
            print("Model loaded successfully!")
            print(f"\nModel Summary:")
            self.model.summary()
        except Exception as e:
            print(f"Error loading model: {e}")
            sys.exit(1)
    
    def preprocess_image(self, img_path):
        """
        Preprocess the image for prediction.
        
        Args:
            img_path (str): Path to the image file
            
        Returns:
            numpy.ndarray: Preprocessed image array
        """
        try:
            # Load image
            img = image.load_img(img_path, target_size=self.img_size)
            
            # Convert to array
            img_array = image.img_to_array(img)
            
            # Expand dimensions to match model input shape (batch_size, height, width, channels)
            img_array = np.expand_dims(img_array, axis=0)
            
            # Preprocess using ResNet50 preprocessing
            img_array = preprocess_input(img_array)
            
            return img_array
        except Exception as e:
            print(f"Error preprocessing image {img_path}: {e}")
            return None
    
    def predict_single(self, img_path, verbose=True):
        """
        Predict the class of a single image.
        
        Args:
            img_path (str): Path to the image file
            verbose (bool): Whether to print detailed results
            
        Returns:
            dict: Dictionary containing prediction results
        """
        # Preprocess image
        processed_img = self.preprocess_image(img_path)
        
        if processed_img is None:
            return None
        
        # Make prediction
        predictions = self.model.predict(processed_img, verbose=0)
        
        # Get predicted class
        predicted_class_idx = np.argmax(predictions[0])
        predicted_class = self.class_names[predicted_class_idx]
        confidence = predictions[0][predicted_class_idx] * 100
        
        # Create results dictionary
        results = {
            'image_path': img_path,
            'predicted_class': predicted_class,
            'confidence': confidence,
            'all_probabilities': {
                class_name: float(prob * 100) 
                for class_name, prob in zip(self.class_names, predictions[0])
            }
        }
        
        if verbose:
            print(f"\n{'='*60}")
            print(f"Image: {os.path.basename(img_path)}")
            print(f"{'='*60}")
            print(f"Predicted Class: {predicted_class.upper()}")
            print(f"Confidence: {confidence:.2f}%")
            print(f"\nAll Probabilities:")
            for class_name, prob in results['all_probabilities'].items():
                print(f"  {class_name.capitalize()}: {prob:.2f}%")
            print(f"{'='*60}\n")
        
        return results
    
    def predict_batch(self, image_folder, file_extensions=('.jpg', '.jpeg', '.png', '.bmp')):
        """
        Predict classes for all images in a folder.
        
        Args:
            image_folder (str): Path to folder containing images
            file_extensions (tuple): Tuple of valid image file extensions
            
        Returns:
            list: List of prediction results for all images
        """
        image_folder = Path(image_folder)
        
        if not image_folder.exists():
            print(f"Error: Folder {image_folder} does not exist!")
            return []
        
        # Get all image files
        image_files = [
            f for f in image_folder.iterdir() 
            if f.is_file() and f.suffix.lower() in file_extensions
        ]
        
        if not image_files:
            print(f"No images found in {image_folder}")
            return []
        
        print(f"Found {len(image_files)} images. Starting predictions...\n")
        
        results = []
        for img_file in image_files:
            result = self.predict_single(str(img_file), verbose=True)
            if result:
                results.append(result)
        
        return results
    
    def predict_test_set(self):
        """
        Predict all images in the Testing folder and calculate accuracy per class.
        
        Returns:
            dict: Dictionary containing accuracy metrics
        """
        testing_path = Path('Testing')
        
        if not testing_path.exists():
            print("Testing folder not found!")
            return None
        
        results_by_class = {class_name: {'correct': 0, 'total': 0} for class_name in self.class_names}
        all_predictions = []
        
        print("\n" + "="*60)
        print("EVALUATING TEST SET")
        print("="*60 + "\n")
        
        for class_name in self.class_names:
            class_path = testing_path / class_name
            
            if not class_path.exists():
                print(f"Warning: {class_path} not found, skipping...")
                continue
            
            image_files = [
                f for f in class_path.iterdir() 
                if f.is_file() and f.suffix.lower() in ('.jpg', '.jpeg', '.png', '.bmp')
            ]
            
            print(f"\nProcessing {class_name.upper()} images ({len(image_files)} images)...")
            
            for img_file in image_files:
                result = self.predict_single(str(img_file), verbose=False)
                if result:
                    all_predictions.append(result)
                    results_by_class[class_name]['total'] += 1
                    
                    if result['predicted_class'] == class_name:
                        results_by_class[class_name]['correct'] += 1
        
        # Calculate and display metrics
        print("\n" + "="*60)
        print("TEST SET RESULTS")
        print("="*60 + "\n")
        
        total_correct = 0
        total_images = 0
        
        for class_name, metrics in results_by_class.items():
            if metrics['total'] > 0:
                accuracy = (metrics['correct'] / metrics['total']) * 100
                print(f"{class_name.capitalize()}: {metrics['correct']}/{metrics['total']} "
                      f"({accuracy:.2f}% accuracy)")
                total_correct += metrics['correct']
                total_images += metrics['total']
        
        overall_accuracy = (total_correct / total_images * 100) if total_images > 0 else 0
        print(f"\nOverall Accuracy: {total_correct}/{total_images} ({overall_accuracy:.2f}%)")
        print("="*60 + "\n")
        
        return {
            'by_class': results_by_class,
            'overall_accuracy': overall_accuracy,
            'all_predictions': all_predictions
        }


def main():
    """Main function to demonstrate usage"""
    
    print("Brain Tumor Classification System")
    print("="*60 + "\n")
    
    # Initialize classifier
    classifier = BrainTumorClassifier('hybrid_cnn_resnet50_best.h5')
    
    # Example usage - uncomment the option you want to use:
    
    # Option 1: Predict a single image
    # image_path = 'path/to/your/image.jpg'
    # result = classifier.predict_single(image_path)
    
    # Option 2: Predict all images in a folder
    # folder_path = 'uploads'
    # results = classifier.predict_batch(folder_path)
    
    # Option 3: Evaluate the entire test set
    test_results = classifier.predict_test_set()
    
    print("\nPrediction complete!")


if __name__ == "__main__":
    main()
