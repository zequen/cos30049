import axios from "axios";
import React, { useState } from "react";
import "./App.css";

export default function InputForm({ setResult, setHistory }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');

    // input validation function
    const validateInput = () => {
        // check if text is empty or only whitespace
        if (!text.trim()) {
            setValidationError('please enter some text to analyse');
            return false;
        }
        // check minimum length
        if (text.trim().length < 10) {
            setValidationError('text must be at least 10 characters long');
            return false;
        }
        // check maximum length
        if (text.length > 5000) {
            setValidationError('text must be less than 5000 characters');
            return false;
        }
        // clear validation error if all checks pass
        setValidationError('');
        return true;
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate input before submitting
        if (!validateInput()) {
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await axios.post("http://127.0.0.1:8000/predict", { text });
            setResult(res.data.prediction);
            setHistory((prev) => [...prev, res.data.prediction]);
        } catch (err) {
            setError("failed to connect to the server. please ensure the backend is running");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // handle clear/reset
    const handleClear = () => {
        setText('');
        setError('');
        setValidationError('');
        setResult(null);
    };

    return (
        <div className="input-form-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="text-input" className="input-label">
                    enter text to analyse
                </label>

                <textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="paste a social media post, tweet, or article here..."
                    className={`input-textarea ${validationError ? 'error' : ''}`}
                />

                {/* validation error message */}
                {validationError && (
                    <div className="error-message">
                        {validationError}
                    </div>
                )}

                {/* network error message */}
                {error && (
                    <div className="network-error">
                        {error}
                    </div>
                )}

                {/* buttons */}
                <div className="button-group">
                    <button
                        type="submit"
                        className="button-submit"
                        disabled={loading}
                    >
                        {loading ? 'analysing...' : 'analyse text'}
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="button-clear"
                    >
                        clear
                    </button>
                </div>

                {/* helper text */}
                <p className="helper-text">
                    enter at least 10 characters to analyse
                </p>
            </form>
        </div>
    );
}