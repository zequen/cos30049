import axios from "axios";
import React, { useState } from "react";

export default function InputForm({ setResult, setHistory }) {
    // state to store user input text
    const [text, setText] = useState("");
    // state to track if request is in progress
    const [loading, setLoading] = useState(false);
    // state to store error messages
    const [error, setError] = useState("");

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate that text is not empty
        if (!text.trim()) {
            setError("please enter some text");
            return;
        }

        // set loading state and clear previous errors
        setLoading(true);
        setError("");

        try {
            // send post request to backend prediction endpoint
            const res = await axios.post("http://127.0.0.1:8000/predict", { text });
            // update result state with prediction
            setResult(res.data.prediction);
            // add prediction to history for charts
            setHistory((prev) => [...prev, res.data.prediction]);
        } catch (err) {
            // handle errors if backend is not running or request fails
            setError("backend: wallahi i'm cooked");
            console.error(err);
        } finally {
            // reset loading state after request completes
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* textarea for user to input text to analyze */}
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="enter text to analyze..."
                rows={5}
                disabled={loading}
            />
            {/* submit button that shows loading state */}
            <button type="submit" disabled={loading}>
                {loading ? "analyzing..." : "submit"}
            </button>
            {/* display error message if present */}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}