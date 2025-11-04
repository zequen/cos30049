import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Charts from "./components/Charts";

function App() {
    const [result, setResult] = useState(null);
    const [history, setHistory] = useState([]);

    return (
        <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1 style={{ textAlign: "center" }}>Misinformation Detector</h1>

            <InputForm setResult={setResult} setHistory={setHistory} />

            {result && (
                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    Prediction: <strong>{result}</strong>
                </p>
            )}

            <Charts history={history} />
        </div>
    );
}

// ✅ THIS LINE IS CRUCIAL
export default App;