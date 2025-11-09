import React, { useState, useEffect } from "react";
import InputForm from "./components/InputForm";
import Charts from "./components/Charts";
import "./App.css";

function MainApp() {
    // state to store the current prediction result
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);
    const [keywordData, setKeywordData] = useState({});
    const [modelStats, setModelStats] = useState({
        random_forest: { total: 0, real: 0, fake: 0 },
        logistic_regression: { total: 0, real: 0, fake: 0 },
        naive_bayes: { total: 0, real: 0, fake: 0 }
    });

    // set the tab title
    useEffect(() => {
        document.title = "Misinformation Detector";
    }, []); // empty dependency array ensures it runs once on mount

    return (
        <div className="app-container">
            <div className="app-header">
                <h1 className="app-title">Misinformation Detector</h1>
                <p className="app-subtitle">insert a really cool subtitle here</p>
            </div>

            <InputForm
                setResult={setResult}
                setHistory={setHistory}
                setKeywordData={setKeywordData}
                setModelStats={setModelStats}
            />

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

            {history.length > 0 && (
                <Charts
                    history={history}
                    keywordData={keywordData}
                    modelStats={modelStats}
                />
            )}

            <footer className="app-footer">
                <div className="footer-content">
                    <p className="footer-text">
                        © {new Date().getFullYear()} Misinformation Detector
                    </p>
                    <p className="footer-assignment">
                        Assignment 3 - COS30049
                    </p>
                    <p className="footer-authors">
                        Cody Le • John Hoang • Jonathon Taylor
                    </p>
                    <a
                        href="https://github.com/zequen/cos30049"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-github"
                    >
                        View on GitHub
                    </a>
                </div>
            </footer>
        </div>
    );
}

export default MainApp;