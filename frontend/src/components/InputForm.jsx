import axios from "axios";
import React, { useState } from "react";

export default function InputForm({ setResult }) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) {
            setError("Please enter some text");
            return;
        }
        
        setLoading(true);
        setError("");
        
        try {
            const res = await axios.post("http://127.0.0.1:8000/predict", { text });
            setResult(res.data.prediction);
        } catch (err) {
            setError("Failed to get prediction. Is the backend running?");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to analyze..."
                rows={5}
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? "Analyzing..." : "Submit"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}