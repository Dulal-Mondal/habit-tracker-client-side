// AddHabit.jsx
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";

const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

const AddHabit = () => {
    const { user } = useContext(AuthContext);

    const [habitData, setHabitData] = useState({
        title: "",
        description: "",
        category: "",
        reminderTime: "",
        imageUrl: ""
    });

    const [uploading, setUploading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setHabitData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!user) {
            return Swal.fire("Error", "You must be logged in", "error");
        }

        setUploading(true);

        try {
            const payload = {
                title: habitData.title,
                description: habitData.description,
                category: habitData.category,
                reminderTime: habitData.reminderTime,
                userEmail: user.email,
                userName: user.displayName || user.name,
                isPrivate: "false",
                imageUrl: habitData.imageUrl || null
            };

            const res = await fetch("https://habit-tracker-server-side.vercel.app/habitCards", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText);
            }

            const data = await res.json();
            console.log("Server Response:", data);

            Swal.fire("Success", "Habit added!", "success");

            // Clear form
            setHabitData({ title: "", description: "", category: "", reminderTime: "", imageUrl: "" });
        } catch (err) {
            console.error("Upload Error:", err);
            Swal.fire("Error", "Failed to add habit: " + err.message, "error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Habit</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Habit Title"
                    value={habitData.title}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={habitData.description}
                    onChange={handleChange}
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
                <input
                    type="url"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={habitData.imageUrl}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded"
                />
                <input
                    type="text"
                    value={user?.displayName || user?.name}
                    readOnly
                    className="border px-4 py-2 rounded bg-gray-100"
                />
                <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="border px-4 py-2 rounded bg-gray-100"
                />
                <button
                    type="submit"
                    disabled={uploading}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {uploading ? "Uploading..." : "Add Habit"}
                </button>
            </form>
        </section>
    );
};

export default AddHabit;
