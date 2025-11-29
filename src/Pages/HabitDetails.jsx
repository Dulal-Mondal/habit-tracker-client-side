import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const HabitDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [habit, setHabit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Fetch habit details
    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res = await fetch(`https://habit-tracker-server-side.vercel.app/habits/${id}`);
                if (!res.ok) throw new Error("Failed to fetch habit");
                const data = await res.json();
                setHabit(data);
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to load habit", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchHabit();
    }, [id]);

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (!habit) return <p className="text-center py-10">Habit not found</p>;

    // Calculate progress (% of last 30 days completed)
    const last30Dates = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        last30Dates.push(d.toISOString().split("T")[0]);
    }

    const completedLast30 = habit.completionHistory.filter(date =>
        last30Dates.includes(date)
    ).length;

    const progressPercent = Math.round((completedLast30 / 30) * 100);

    const handleMarkComplete = async () => {
        if (!user) {
            return Swal.fire("Error", "You must be logged in", "error");
        }

        const today = new Date().toISOString().split("T")[0];
        if (habit.completionHistory.includes(today)) {
            return Swal.fire("Info", "Already marked today", "info");
        }

        setUpdating(true);
        try {
            const res = await fetch(`https://habit-tracker-server-side.vercel.app/habits/complete/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: today })
            });

            if (!res.ok) throw new Error("Failed to mark complete");
            const updatedHabit = await res.json();
            setHabit(updatedHabit);
            Swal.fire("Success", "Habit marked complete!", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.message, "error");
        } finally {
            setUpdating(false);
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-4">{habit.title}</h2>
            {habit.imageUrl && <img src={habit.imageUrl} alt={habit.title} className="w-full h-64 object-cover mb-4 rounded" />}
            <p className="mb-2"><strong>Category:</strong> {habit.category}</p>
            <p className="mb-4">{habit.description}</p>

            <div className="mb-4">
                <p className="mb-1 font-medium">Progress (last 30 days): {progressPercent}%</p>
                <div className="bg-gray-200 h-4 rounded">
                    <div
                        className="bg-green-500 h-4 rounded"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            <div className="mb-4">
                <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded">
                    Current Streak: {habit.currentStreak} days
                </span>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                Created by: <span className="font-medium">{habit.userName || habit.userEmail}</span>
            </div>

            <button
                disabled={updating}
                onClick={handleMarkComplete}
                className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
            >
                {updating ? "Updating..." : "Mark Complete"}
            </button>
        </section>
    );
};

export default HabitDetails;
