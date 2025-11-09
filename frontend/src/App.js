import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Charts from "./components/Charts";

function MainApp() {
    // state to store the current prediction result
    const [result, setResult] = useState(null);
    // state to store history of all predictions for charts
    const [history, setHistory] = useState([]);
    // state to store keyword data from latest prediction
    const [keywordData, setKeywordData] = useState({});

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem", color: "#111827" }}>
                misinformation detector
            </h1>

            {/* form component for text input and submission */}
            <InputForm setResult={setResult} setHistory={setHistory} setKeywordData={setKeywordData} />

            {/* display prediction result if available */}
            {result && (
                <div style={{
                    textAlign: "center",
                    marginTop: "1.5rem",
                    padding: "1rem",
                    backgroundColor: result === "Real" ? "#d1fae5" : "#fee2e2",
                    borderRadius: "8px",
                    maxWidth: "800px",
                    margin: "1.5rem auto",
                }}>
                    <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                        prediction: <strong>{result}</strong>
                    </p>
                </div>
            )}

            {/* render charts showing prediction history and keyword data */}
            {history.length > 0 && (
                <Charts history={history} keywordData={keywordData} />
            )}
        </div>
    );
}

export default MainApp;