import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // ✅ fixed import

const MyHabits = () => {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (user?.email) fetchMyHabits();
    }, [user]);

    const fetchMyHabits = async () => {
        try {
            const res = await fetch(`https://habit-tracker-server-side.vercel.app/myHabits/${user.email}`);
            if (!res.ok) throw new Error("Failed to fetch habits");
            const data = await res.json();
            setHabits(data);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.message, "error");
        }
    };

    const markComplete = async (id) => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const res = await fetch(`https://habit-tracker-server-side.vercel.app/habits/complete/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ date: today }),
            });
            const data = await res.json();
            setHabits(habits.map(h => h._id === id ? data : h));
        } catch (err) {
            console.error(err);
        }
    };

    const deleteHabit = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });
        if (!confirm.isConfirmed) return;

        try {
            const res = await fetch(`https://habit-tracker-server-side.vercel.app/habits/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete habit");
            setHabits(habits.filter(h => h._id !== id));
            Swal.fire("Deleted!", "Habit has been deleted.", "success");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.message, "error");
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">My Habits</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse text-left">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Streak</th>
                            <th className="p-2 border">Created</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map(h => (
                            <tr key={h._id} className="border-b">
                                <td className="p-2 border">{h.title}</td>
                                <td className="p-2 border">{h.category}</td>
                                <td className="p-2 border">{h.currentStreak || 0}</td>
                                <td className="p-2 border">{new Date(h.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 border flex gap-2">
                                    <button
                                        onClick={() => markComplete(h._id)}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Complete
                                    </button>
                                    {/* ✅ FIXED LINK: pass actual habit ID */}
                                    <Link
                                        to={`/updateHabit/${h._id}`}
                                        className="bg-blue-500 text-white px-2 py-1 rounded"
                                    >
                                        Update
                                    </Link>
                                    <button
                                        onClick={() => deleteHabit(h._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MyHabits;
