// Updated responsive HabitDetails component
// (Paste your existing imports here)

import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/apiClient";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const HabitDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completedToday, setCompletedToday] = useState(false);

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/habits/${id}`);
                setHabit(res.data);

                const today = new Date().toISOString().split("T")[0];
                if (res.data.completionHistory?.includes(today)) setCompletedToday(true);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchHabit();
    }, [id]);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!habit) return <p className="text-center py-10">Habit not found</p>;

    const calculateProgress = () => {
        const today = new Date();
        const last30Days = [];
        for (let i = 0; i < 30; i++) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            last30Days.push(d.toISOString().split("T")[0]);
        }
        const completedLast30 = habit.completionHistory?.filter((date) =>
            last30Days.includes(date)
        ).length;
        return Math.floor((completedLast30 / 30) * 100);
    };

    const handleMarkComplete = async () => {
        const today = new Date().toISOString().split("T")[0];

        if (habit.completionHistory?.includes(today)) {
            Swal.fire({
                icon: "info",
                title: "Already Completed",
                text: "You have already marked this habit as complete today!",
            });
            return;
        }

        try {
            const res = await axios.patch(
                `http://localhost:3000/habits/complete/${id}`,
                { date: today }
            );
            setHabit(res.data);
            setCompletedToday(true);
            Swal.fire({
                icon: "success",
                title: "Habit Completed!",
                text: "Great job! Keep the streak going 💪",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: err.response?.data?.message || err.message,
            });
        }
    };

    const progress = calculateProgress();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto p-4 sm:p-6 mt-6 sm:mt-10 bg-white shadow-lg rounded-lg"
        >
            <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
                {habit.title}
            </h1>

            {habit.imageUrl && (
                <img
                    src={habit.imageUrl}
                    alt={habit.title}
                    className="w-full h-48 sm:h-64 object-cover rounded mb-4"
                />
            )}

            <p className="mb-4 text-base sm:text-lg text-gray-700">{habit.description}</p>

            <p
                className="mb-2 text-gray-600 text-sm sm:text-base"
                data-tooltip-id="category-tip"
                data-tooltip-content={`This habit belongs to the ${habit.category || "General"} category`}
            >
                <span className="font-semibold">Category:</span> {habit.category || "N/A"}
            </p>

            {/* Progress Bar */}
            <div className="mb-4">
                <p
                    className="text-sm mb-1"
                    data-tooltip-id="progress-tip"
                    data-tooltip-content="Shows how often you've completed this habit over the last 30 days"
                >
                    Progress (last 30 days): {progress}%
                </p>
                <div className="w-full bg-gray-200 h-4 rounded overflow-hidden">
                    <motion.div
                        className="bg-blue-500 h-4 rounded"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                    ></motion.div>
                </div>
            </div>

            {/* Streak */}
            <motion.p
                className="mb-4 text-sm sm:text-base"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                data-tooltip-id="streak-tip"
                data-tooltip-content="Your current streak increases each consecutive day you complete this habit!"
            >
                <span className="font-semibold">Current Streak:</span>{" "}
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                    {habit.currentStreak || 0} days
                </span>
            </motion.p>

            {/* Created By */}
            <div className="text-xs sm:text-sm text-gray-500 mb-3">
                <p>
                    Created by:{" "}
                    <span className="font-medium">
                        {habit.userName || habit.userEmail || "Unknown"}
                    </span>
                </p>
            </div>

            {/* Buttons */}
            <button
                onClick={handleMarkComplete}
                className={`w-full mt-2 py-2 rounded text-white text-sm sm:text-base ${completedToday ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"
                    }`}
                disabled={completedToday}
            >
                {completedToday ? "Completed Today ✅" : "Mark Complete"}
            </button>

            <button
                onClick={() => navigate("/myhabits")}
                className="w-full mt-2 py-2 text-sm sm:text-base bg-gray-800 text-white rounded hover:bg-gray-900"
            >
                Back to My Habits
            </button>

            <Tooltip id="category-tip" place="top" effect="solid" />
            <Tooltip id="progress-tip" place="top" effect="solid" />
            <Tooltip id="streak-tip" place="top" effect="solid" />
        </motion.div>
    );
};

export default HabitDetails;
