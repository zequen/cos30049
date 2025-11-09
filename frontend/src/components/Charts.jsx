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

export default function Charts({ history, keywordData }) {
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
                backgroundColor: ["#4ade80", "#f87171"], // green for real, red for fake
                borderColor: ["#22c55e", "#ef4444"],
                borderWidth: 2,
            },
        ],
    };

    // prepare data structure for keyword frequency bar chart
    const keywordLabels = Object.keys(keywordData);
    const keywordCounts = Object.values(keywordData);

    const barData = {
        labels: keywordLabels,
        datasets: [
            {
                label: "keyword frequency",
                data: keywordCounts,
                backgroundColor: "#6366f1",
                borderColor: "#4f46e5",
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            tooltip: {
                enabled: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
                {/* pie chart showing distribution of predictions */}
                <div style={{ maxWidth: "400px", flex: "1" }}>
                    <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>prediction history</h3>
                    <Pie data={pieData} />
                </div>

                {/* bar chart showing keyword frequencies */}
                {keywordLabels.length > 0 && (
                    <div style={{ maxWidth: "600px", flex: "1" }}>
                        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>misinformation keywords detected</h3>
                        <Bar data={barData} options={barOptions} />
                    </div>
                )}
            </div>
        </div>
    );
}