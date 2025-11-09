import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Charts from "./components/Charts";
import "./App.css";

function MainApp() {
    // state to store the current prediction result
    const [result, setResult] = useState(null);
    // state to store history of all predictions for charts
    const [history, setHistory] = useState([]);
    // state to store keyword data from latest prediction
    const [keywordData, setKeywordData] = useState({});
    // state to track model statistics
    const [modelStats, setModelStats] = useState({
        random_forest: { total: 0, real: 0, fake: 0 },
        logistic_regression: { total: 0, real: 0, fake: 0 },
        naive_bayes: { total: 0, real: 0, fake: 0 }
    });

    return (
        <div className="app-container">
            <div className="app-header">
                <h1 className="app-title">Misinformation Detector</h1>
                <p className="app-subtitle">AI-powered text analysis for fake news detection</p>
            </div>

            {/* form component for text input and submission */}
            <InputForm
                setResult={setResult}
                setHistory={setHistory}
                setKeywordData={setKeywordData}
                setModelStats={setModelStats}
            />

            {/* display prediction result if available */}
            {result && (
                <div className={`result-card ${result === "Real" ? "result-real" : "result-fake"}`}>
                    <div className="result-icon">
                        {result === "Real" ? "✓" : "✗"}
                    </div>
                    <div className="result-content">
                        <p className="result-label">Prediction</p>
                        <p className="result-value">{result}</p>
                    </div>
                </div>
            )}

            {/* render charts showing prediction history and keyword data */}
            {history.length > 0 && (
                <Charts
                    history={history}
                    keywordData={keywordData}
                    modelStats={modelStats}
                />
            )}
        </div>
    );
}

export default MainApp;