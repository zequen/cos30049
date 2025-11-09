import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
    Chart,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

// register chart.js components needed for rendering charts
Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Charts({ history, keywordData, modelStats }) {
    // count how many "real" predictions occurred in history
    const realCount = history.filter((item) => item === "Real").length;
    // count how many "fake" predictions occurred in history
    const fakeCount = history.filter((item) => item === "Fake").length;

    // prepare data structure for pie chart
    const pieData = {
        labels: ["Real", "Fake"],
        datasets: [
            {
                data: [realCount, fakeCount],
                backgroundColor: ["#10b981", "#ef4444"],
                borderColor: ["#059669", "#dc2626"],
                borderWidth: 2,
            },
        ],
    };

    const pieOptions = {
        plugins: {
            legend: {
                labels: {
                    color: '#e5e7eb',
                    font: { size: 14 }
                }
            }
        }
    };

    // prepare data structure for keyword frequency bar chart
    const keywordLabels = Object.keys(keywordData);
    const keywordCounts = Object.values(keywordData);

    const keywordBarData = {
        labels: keywordLabels,
        datasets: [
            {
                label: "keyword frequency",
                data: keywordCounts,
                backgroundColor: "#8b5cf6",
                borderColor: "#7c3aed",
                borderWidth: 1,
            },
        ],
    };

    // prepare model statistics data
    const modelNames = Object.keys(modelStats);
    const modelTotals = modelNames.map(name => modelStats[name].total);
    const modelReals = modelNames.map(name => modelStats[name].real);
    const modelFakes = modelNames.map(name => modelStats[name].fake);

    const modelStatsData = {
        labels: modelNames.map(name => {
            switch(name) {
                case 'random_forest': return 'Random Forest';
                case 'logistic_regression': return 'Logistic Regression';
                case 'naive_bayes': return 'Naive Bayes';
                default: return name;
            }
        }),
        datasets: [
            {
                label: "Real",
                data: modelReals,
                backgroundColor: "#10b981",
                borderColor: "#059669",
                borderWidth: 1,
            },
            {
                label: "Fake",
                data: modelFakes,
                backgroundColor: "#ef4444",
                borderColor: "#dc2626",
                borderWidth: 1,
            }
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: '#e5e7eb',
                    font: { size: 12 }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#1f2937',
                titleColor: '#f3f4f6',
                bodyColor: '#e5e7eb',
                borderColor: '#374151',
                borderWidth: 1
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#9ca3af',
                    font: { size: 11 }
                },
                grid: {
                    color: '#374151'
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: '#9ca3af'
                },
                grid: {
                    color: '#374151'
                }
            },
        },
    };

    return (
        <div className="charts-container">
            <div className="charts-grid">
                {/* pie chart showing distribution of predictions */}
                <div className="chart-card">
                    <h3 className="chart-title">📊 Prediction Distribution</h3>
                    <div className="chart-wrapper">
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                    <div className="chart-stats">
                        <div className="stat-item">
                            <span className="stat-label">Total:</span>
                            <span className="stat-value">{realCount + fakeCount}</span>
                        </div>
                    </div>
                </div>

                {/* model statistics bar chart */}
                {modelTotals.some(total => total > 0) && (
                    <div className="chart-card chart-card-wide">
                        <h3 className="chart-title">🤖 Model Performance Statistics</h3>
                        <div className="chart-wrapper">
                            <Bar data={modelStatsData} options={barOptions} />
                        </div>
                    </div>
                )}

                {/* bar chart showing keyword frequencies */}
                {keywordLabels.length > 0 && (
                    <div className="chart-card chart-card-wide">
                        <h3 className="chart-title">🔍 Misinformation Keywords Detected</h3>
                        <div className="chart-wrapper">
                            <Bar data={keywordBarData} options={barOptions} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}