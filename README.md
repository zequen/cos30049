# Misinformation Detector

A full-stack web application that uses machine learning to detect misinformation in text. The system analyzes text for suspicious patterns, sensational language, and misinformation keywords to classify content as "Real" or "Fake".

## Features

- **Machine Learning Models**: Random Forest, Logistic Regression, and Naive Bayes classifiers
- **Real-time Visualization**: Pie chart showing prediction history and bar chart displaying detected misinformation keywords
- **Keyword Detection**: Identifies 70+ misinformation indicators including sensational language, conspiracy terms, and clickbait phrases
- **Fast API Backend**: RESTful API built with FastAPI
- **React Frontend**: Modern, responsive user interface

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
```
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
- **Python 3.12** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **Git LFS** (required for model + dataset files)

---

### Pull LFS Files (Important️)
If this is your first time cloning the repo, ensure Git LFS is installed and pull the large files:

```bash
# Install Git LFS if not already installed
git lfs install

# Pull model and dataset files tracked by LFS
git lfs pull
```

This step is required to download `.pkl` model files and dataset `.csv` files used by the backend.

---

### Backend Setup

#### 1. Navigate to the backend directory
```bash
cd backend
```

#### 2. Create and activate a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate   # On macOS/Linux
# or
venv\Scripts\activate      # On Windows
```

#### 3. Install Python dependencies
```bash
pip install -r requirements.txt
```

#### 4. Ensure model files exist in `backend/model/`:
- `vectorizer.pkl`
- `model_rf.pkl`
- `model_logreg.pkl`
- `model_nb.pkl`

---

### Alternative macOS Installation (using Homebrew)
If you prefer to use **Homebrew** for dependency setup on macOS:

```bash
# Install Python and Node.js
brew install python node git-lfs

# Verify installations
python3 --version
node -v
npm -v

# Pull large files via Git LFS
git lfs install
git lfs pull

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies and run the backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### Frontend Setup

#### 1. Navigate to the frontend directory
```bash
cd frontend
```

#### 2. Install dependencies
```bash
npm install
```

#### 3. Start the frontend development server
```bash
npm start
```

---

## Running the Application

### Start the Backend Server
```bash
uvicorn main:app --reload
```
API available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

Test endpoints:
- `/` → Health check
- `/docs` → Interactive API documentation

### Start the Frontend
```bash
npm start
```
App will open at [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Enter text (minimum 10 characters)
2. Click **"Analyse Text"**
3. View prediction (Real or Fake)
4. Review **Prediction History** (pie chart)
5. Check **Keywords Detected** (bar chart)

---

### Example Text to Test

**Fake Example:**
```
SHOCKING BREAKING NEWS! You won't believe what they don't want you to know! 
This URGENT truth has been EXPOSED by insiders! Share NOW before it's censored!
```

**Real Example:**
```
The Federal Reserve announced today that interest rates will remain unchanged. 
Economic indicators show steady growth in the manufacturing sector according to 
government data released this morning.
```

---

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

---

## Model Training

To retrain the models with new data:

1. Place datasets in `backend/model/data/`:
   - `Fake.csv`, `True.csv`
   - `Constraint_English_Train.xlsx`
   - `Constraint_English_Val.xlsx`
   - `Constraint_English_Test.xlsx`
2. Run:
```bash
cd backend/model
python trainModel.py
```

Generates new `.pkl` model files.

---

## Misinformation Keywords

Categories include:
- **Sensational words**: shocking, breaking, exclusive, urgent
- **Conspiracy terms**: coverup, hidden, agenda, manipulation
- **Truth claims**: wake up, real truth, they don't want you to know
- **Medical misinformation**: miracle cure, big pharma, toxins
- **Clickbait phrases**: you won't believe, what happened next
- **Emotional manipulation**: outrage, scandal, crisis

---

## Configuration

### Backend
- Edit CORS origins in `backend/main.py`
- Change model defaults in `backend/model/predictor.py`
- Modify keywords in `backend/model/keywords.py`

### Frontend
- Update API URL in `frontend/src/components/InputForm.jsx`
- Adjust input validation rules in `InputForm.jsx`

---

## Troubleshooting

### Backend won’t start
- Ensure venv is activated
- Check Python version (`python --version`)
- Verify `.pkl` files exist or pull via `git lfs pull`
- Make sure port `8000` is available

### Frontend connection error
- Confirm backend is running
- Check browser console for CORS errors
- Verify axios is installed (`npm list axios`)

### Charts not displaying
- Ensure Chart.js + react-chartjs-2 are installed
- Check console for JS errors
- Ensure prediction history has data

---

## Authors
- Cody Le
- John Hoang
- Jonathon Taylor

Assignment 3 - COS30049