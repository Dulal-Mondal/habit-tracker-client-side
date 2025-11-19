import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import apiClient from "../services/apiClient";
import Swal from "sweetalert2";

const MyHabits = () => {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (user?.email) fetchMyHabits();
    }, [user]);

    const fetchMyHabits = async () => {
        try {
            const res = await apiClient.get(`/myHabits/${user.email}`);
            setHabits(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteHabit = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This habit will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await apiClient.delete(`/habits/${id}`);
                setHabits(habits.filter((h) => h._id !== id));
                Swal.fire("Deleted!", "Habit has been deleted.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete habit", "error");
            }
        }
    };

    const markComplete = async (id) => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const res = await apiClient.patch(`/habits/complete/${id}`, { date: today });
            setHabits(habits.map((h) => (h._id === id ? res.data : h)));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">My Habits</h2>
            <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Title</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Current Streak</th>
                        <th className="p-2 border">Created Date</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {habits.map((habit) => (
                        <tr key={habit._id} className="border-b">
                            <td className="p-2 border">{habit.title}</td>
                            <td className="p-2 border">{habit.category}</td>
                            <td className="p-2 border">{habit.currentStreak || 0}</td>
                            <td className="p-2 border">{new Date(habit.createdAt).toLocaleDateString()}</td>
                            <td className="p-2 border flex gap-2">
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                    onClick={() => markComplete(habit._id)}
                                >
                                    Complete
                                </button>
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => window.location.href = `/updateHabit/${habit._id}`}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteHabit(habit._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
};

export default MyHabits;
