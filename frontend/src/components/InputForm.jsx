import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import "../App.css";

export default function InputForm({ setResult, setHistory, setKeywordData, setModelStats }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');
    const [model, setModel] = useState('random_forest');
    const textareaRef = useRef(null);

    // auto-resize textarea as user types
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [text]);

    // input validation function
    const validateInput = () => {
        // check if text is empty or only whitespace
        if (!text.trim()) {
            setValidationError('Please enter some text to analyse');
            return false;
        }
        // check minimum length
        if (text.trim().length < 10) {
            setValidationError('Text must be at least 10 characters long');
            return false;
        }
        // check maximum length
        if (text.length > 5000) {
            setValidationError('Text must be less than 5000 characters');
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
            const res = await axios.post("http://127.0.0.1:8000/predict", { text, model });
            const prediction = res.data.prediction;

            // update result state with prediction
            setResult(prediction);
            // add prediction to history for charts
            setHistory((prev) => [...prev, prediction]);
            // update keyword data for bar chart
            setKeywordData(res.data.keywords || {});

            // update model statistics
            setModelStats((prev) => ({
                ...prev,
                [model]: {
                    total: prev[model].total + 1,
                    real: prev[model].real + (prediction === "Real" ? 1 : 0),
                    fake: prev[model].fake + (prediction === "Fake" ? 1 : 0)
                }
            }));
        } catch (err) {
            setError("Failed to connect to the server. Please ensure the backend is running");
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
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className="input-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="model-select" className="input-label">
                            Select Model
                        </label>
                        <select
                            id="model-select"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="input-select"
                        >
                            <option value="random_forest">Random Forest</option>
                            <option value="logistic_regression">Logistic Regression</option>
                            <option value="naive_bayes">Naive Bayes</option>
                        </select>
                    </div>
                </div>

                <label htmlFor="text-input" className="input-label">
                    Enter Text to Analyse
                </label>

                <textarea
                    ref={textareaRef}
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste a social media post, tweet, or article here..."
                    className={`input-textarea ${validationError ? 'error' : ''}`}
                    rows={4}
                />

                {/* character counter */}
                <div className="character-counter">
                    {text.length} / 5,000 Characters
                </div>

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
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Analysing...
                            </>
                        ) : (
                            'Analyse Text'
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        className="button-clear"
                    >
                        Clear
                    </button>
                </div>

                {/* helper text */}
                <p className="helper-text">
                    Enter at least 10 characters to analyse
                </p>
            </form>
        </div>
    );
}