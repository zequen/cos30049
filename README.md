# Misinformation Detector

A full-stack web application that uses machine learning to detect misinformation in text. The system analyzes text for suspicious patterns, sensational language, and misinformation keywords to classify content as "Real" or "Fake".

## Features

- 🤖 **Machine Learning Models**: Random Forest, Logistic Regression, and Naive Bayes classifiers
- 📊 **Real-time Visualization**: Pie chart showing prediction history and bar chart displaying detected misinformation keywords
- 🎯 **Keyword Detection**: Identifies 70+ misinformation indicators including sensational language, conspiracy terms, and clickbait phrases
- ⚡ **Fast API Backend**: RESTful API built with FastAPI
- 💻 **React Frontend**: Modern, responsive user interface

## Tech Stack

### Backend
- Python 3.12
- FastAPI
- scikit-learn
- NumPy, Pandas, SciPy
- TF-IDF Vectorization

### Frontend
- React 19
- Chart.js + react-chartjs-2
- Axios
- CSS3

## Project Structure

```plaintext
ProjectMisinfo/
├── backend/
│   ├── model/
│   │   ├── data/              # training datasets
│   │   ├── keywords.py        # misinformation keyword list
│   │   ├── predictor.py       # prediction logic
│   │   ├── trainModel.py      # model training script
│   │   ├── vectorizer.pkl     # trained TF-IDF vectorizer
│   │   └── model_*.pkl        # trained ML models
│   ├── main.py                # FastAPI application
│   └── requirements.txt       # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Charts.jsx     # visualization component
│   │   │   └── InputForm.jsx  # text input component
│   │   ├── App.js             # main application component
│   │   └── index.js           # React entry point
│   └── package.json           # Node dependencies
└── README.md
```

## Installation

### Prerequisites

- Python 3.12 or higher
- Node.js 18 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Ensure model files exist in `backend/model/`:
    - `vectorizer.pkl`
    - `model_rf.pkl`
    - `model_logreg.pkl`
    - `model_nb.pkl`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

## Running the Application

### Start the Backend Server

1. From the `backend` directory with virtual environment activated:
```bash
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`

You can test the API by visiting:
- `http://127.0.0.1:8000/` - Health check
- `http://127.0.0.1:8000/docs` - Interactive API documentation

### Start the Frontend

1. In a new terminal, navigate to the `frontend` directory:
```bash
cd frontend
npm start
```
The application will open at `http://localhost:3000`

## Usage

1. **Enter text** to analyze in the textarea (minimum 10 characters)
2. Click **"Analyse Text"** to submit
3. View the prediction result (Real or Fake)
4. Check the **Prediction History** pie chart to see distribution of results
5. If misinformation keywords are detected, view them in the **Keywords Detected** bar chart

### Example Text to Test

**Likely to be classified as Fake:**
```text
SHOCKING BREAKING NEWS! You won't believe what they don't want you to know! 
This URGENT truth has been EXPOSED by insiders! Share NOW before it's censored!
```

**Likely to be classified as Real:**
```text
The Federal Reserve announced today that interest rates will remain unchanged. 
Economic indicators show steady growth in the manufacturing sector according to 
government data released this morning.
```

## API Endpoints

### `GET /`
Health check endpoint

**Response:**
```json
{
  "message": "API is running"
}
```

### `POST /predict`
Analyze text for misinformation

**Request Body:**
```json
{
  "text": "Your text to analyze here"
}
```

**Response:**
```json
{
  "prediction": "Real",
  "keywords": {
    "shocking": 2,
    "urgent": 1
  }
}
```

## Model Training

To retrain the models with new data:

1. Place your training datasets in `backend/model/data/`:
    - `Fake.csv` and `True.csv` (Kaggle dataset)
    - `Constraint_English_Train.xlsx`
    - `Constraint_English_Val.xlsx`
    - `Constraint_English_Test.xlsx`

2. Run the training script:
```bash
cd backend/model
python trainModel.py
```
This will generate new `.pkl` files for the models and vectorizer.

## Misinformation Keywords

The system detects 70+ keywords organized into categories:
- **Sensational words**: shocking, breaking, exclusive, urgent
- **Conspiracy terms**: coverup, hidden, agenda, manipulation
- **Truth claims**: wake up, real truth, they don't want you to know
- **Medical misinformation**: miracle cure, big pharma, toxins
- **Clickbait phrases**: you won't believe, what happened next
- **Emotional manipulation**: outrage, scandal, crisis

Keywords are matched using word boundaries to avoid false positives (e.g., "lie" in "believe").

## Configuration

### Backend
- **CORS Origins**: Modify `allow_origins` in `backend/main.py` to add allowed frontend URLs
- **Model Selection**: Change default model in `backend/model/predictor.py`
- **Keywords**: Edit `backend/model/keywords.py` to add/remove keywords

### Frontend
- **API URL**: Update in `frontend/src/components/InputForm.jsx` if backend URL changes
- **Text Validation**: Modify min/max length in `InputForm.jsx`

## Troubleshooting

### Backend won't start
- Ensure virtual environment is activated
- Check Python version: `python --version`
- Verify all `.pkl` files exist in `backend/model/`
- Check if port 8000 is available

### Frontend shows connection error
- Verify backend is running at `http://127.0.0.1:8000`
- Check browser console for CORS errors
- Ensure axios is installed: `npm list axios`

### Charts not displaying
- Check if Chart.js is installed: `npm list chart.js react-chartjs-2`
- Verify browser console for errors
- Ensure prediction history contains data

## License

ISC

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Authors
- Cody Le
- John Hoang
- Johnathon Taylor

Assignment 3 - COS30049