from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS extension
from transformers import BertTokenizer, BertForSequenceClassification
import torch

app = Flask(__name__)
CORS(app)
model_path = "./bert_model"
tokenizer_path = "./bert_tokenizer"

# Load BERT model for sequence classification
model = BertForSequenceClassification.from_pretrained(model_path)
model.eval()  # Set to evaluation mode

# Load BERT tokenizer
tokenizer = BertTokenizer.from_pretrained(tokenizer_path)

@app.route('/api/bert', methods=['POST'])
def predict_event_label():
    # Get the JSON data from the request
    data = request.get_json()
    event_title = data.get('event_title')

    # Tokenize and encode event_title
    inputs = tokenizer(event_title, return_tensors="pt")

    # Forward pass through the model
    with torch.no_grad():
        outputs = model(**inputs)
    # Get the predicted label (assuming model returns logits)
    logits = outputs.logits
    predicted_label = torch.argmax(logits, dim=1).item()

    # Return the predicted label text
    labels = ['tech', 'gaming', 'music', 'fashion', 'entertainment', 'social']  # Replace with actual label names
    predicted_label_text = labels[predicted_label]

    return jsonify({"event_label": predicted_label_text})

if __name__ == '__main__':
    app.run(debug=True, port = 3001)
