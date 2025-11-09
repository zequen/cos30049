import axios from "axios";
import React, { useState } from "react";

export default function InputForm({ setResult, setHistory }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationError, setValidationError] = useState('');


// Input validation function
    const validateInput = () => {

        // Check if text is empty or only whitespace
        if (!text.trim()) {
            setValidationError('Please enter some text to analyse');
            return false;
        }
        // Check minimum length
        if (text.trim().length < 10) {
            setValidationError('Text must be at least 10 characters long');
            return false;
        }
        // Check maximum length
        if (text.length > 5000) {
            setValidationError('Text must be less than 5000 characters');
            return false;
        }
        // Clear validation error if all checks pass
        setValidationError('');
        return true;
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input before submitting
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
            setError("Failed to connect to the server. Please ensure the backend is running");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handle clear/reset
    const handleClear = () => {
        setText('');
        setError('');
        setValidationError('');
        setResult(null);
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
            <form onSubmit={handleSubmit}>
                <label
                    htmlFor="text-input"
                    style={{
                        display: 'block',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.5rem',
                    }}
                >
                    Enter text to analyse
                </label>

                <textarea
                    id="text-input"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste a social media post, tweet, or article here..."
                    style={{
                        width: '100%',
                        height: '200px',
                        padding: '0.75rem',
                        fontSize: '1rem',
                        border: validationError ? '2px solid #ef4444' : '2px solid #d1d5db',
                        borderRadius: '8px',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                    }}
                />

                {/* Validation Error Message */}
                {validationError && (
                    <div style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        backgroundColor: '#fee2e2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        color: '#991b1b',
                        fontSize: '0.875rem',
                    }}>
                        {validationError}
                    </div>
                )}

                {/* Network Error Message */}
                {error && (
                    <div style={{
                        padding: '0.75rem',
                        marginBottom: '1rem',
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        color: '#991b1b',
                        fontSize: '0.875rem',
                    }}>
                        {error}
                    </div>
                )}

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>

                    <button
                        type="submit"
                        style={{
                            flex: 1,
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#ffffff',
                            backgroundColor: '#6366f1',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        Analyse Text
                    </button>

                    <button
                        type="button"
                        onClick={handleClear}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            fontWeight: '600',
                            color: '#374151',
                            backgroundColor: '#ffffff',
                            border: '2px solid #d1d5db',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        Clear
                    </button>
                </div>

                {/* Helper text */}
                <p style={{
                    marginTop: '1rem',
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    textAlign: 'center',
                }}>
                    Enter at least 10 characters to analyse
                </p>
            </form>
        </div>
    );
}