import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";

const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

const UpdateHabit = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [habitData, setHabitData] = useState({
        title: "",
        description: "",
        category: "",
        reminderTime: "",
        imageUrl: "", // ✅ added imageUrl
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res = await fetch(`https://habit-tracker-server-side.vercel.app/habits/${id}`);
                if (!res.ok) throw new Error("Failed to fetch habit");
                const data = await res.json();
                setHabitData({
                    title: data.title,
                    description: data.description,
                    category: data.category,
                    reminderTime: data.reminderTime,
                    imageUrl: data.imageUrl || "", // ✅ set imageUrl from backend
                });
            } catch (err) {
                console.error(err);
                Swal.fire("Error", err.message, "error");
            } finally {
                setLoading(false);
            }
        };
        fetchHabit();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const res = await fetch(`https://habit-tracker-server-side.vercel.app/habits/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(habitData),
            });
            if (!res.ok) throw new Error("Failed to update habit");
            Swal.fire("Success", "Habit updated successfully!", "success");
            navigate("/myhabits");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", err.message, "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-center py-10">Loading habit...</p>;

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Update Habit</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    value={habitData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="border px-4 py-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    value={habitData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="border px-4 py-2 rounded"
                    required
                />
                <select
                    name="category"
                    value={habitData.category}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="time"
                    name="reminderTime"
                    value={habitData.reminderTime}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded"
                    required
                />
                {/* ✅ Added Image URL field */}
                <input
                    type="text"
                    name="imageUrl"
                    value={habitData.imageUrl}
                    onChange={handleChange}
                    placeholder="Image URL"
                    className="border px-4 py-2 rounded"
                />

                <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="border px-4 py-2 rounded bg-gray-100"
                />
                <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="border px-4 py-2 rounded bg-gray-100"
                />

                <button
                    type="submit"
                    disabled={updating}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${updating ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {updating ? "Updating..." : "Update Habit"}
                </button>
            </form>
        </section>
    );
};

export default UpdateHabit;
