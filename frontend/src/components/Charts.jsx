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

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Charts({ history }) {
    // Count how many "Real" and "Fake" predictions occurred
    const realCount = history.filter((item) => item === "Real").length;
    const fakeCount = history.filter((item) => item === "Fake").length;

    const data = {
        labels: ["Real", "Fake"],
        datasets: [
            {
                data: [realCount, fakeCount],
                backgroundColor: ["#4ade80", "#f87171"], // green and red
                borderColor: ["#22c55e", "#ef4444"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="flex justify-around mt-6">
            <div className="w-1/3">
                <Pie data={data} />
            </div>
            <div className="w-1/3">
                <Bar data={data} />
            </div>
        </div>
    );
}