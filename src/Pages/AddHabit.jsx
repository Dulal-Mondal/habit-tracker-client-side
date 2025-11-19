import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

const AddHabit = () => {
    const { user } = useContext(AuthContext);

    const [habitData, setHabitData] = useState({
        title: "",
        description: "",
        category: "",
        reminderTime: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setHabitData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!user) return Swal.fire("Error", "You must be logged in", "error");
        setUploading(true);

        try {
            const formData = new FormData();
            formData.append("title", habitData.title);
            formData.append("description", habitData.description);
            formData.append("category", habitData.category);
            formData.append("reminderTime", habitData.reminderTime);
            formData.append("userEmail", user.email);
            formData.append("userName", user.displayName || user.name);
            formData.append("isPrivate", false);
            if (imageFile) formData.append("image", imageFile);

            const res = await axios.post("http://localhost:3000/habitCards", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            Swal.fire("Success", "Habit added!", "success");

            setHabitData({ title: "", description: "", category: "", reminderTime: "" });
            setImageFile(null);
            setPreview(null);
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to add habit", "error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Add New Habit</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
                <input type="text" name="title" placeholder="Habit Title" value={habitData.title} onChange={handleChange} className="border px-4 py-2 rounded" required />
                <textarea name="description" placeholder="Description" value={habitData.description} onChange={handleChange} className="border px-4 py-2 rounded" required />
                <select name="category" value={habitData.category} onChange={handleChange} className="border px-4 py-2 rounded" required>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input type="time" name="reminderTime" value={habitData.reminderTime} onChange={handleChange} className="border px-4 py-2 rounded" required />

                <input type="file" accept="image/*" onChange={handleFileChange} className="border px-4 py-2 rounded" />
                {preview && <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded mt-2" />}

                <input type="text" value={user?.displayName || user?.name} readOnly className="border px-4 py-2 rounded bg-gray-100" />
                <input type="email" value={user?.email} readOnly className="border px-4 py-2 rounded bg-gray-100" />

                <button type="submit" disabled={uploading} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                    {uploading ? "Uploading..." : "Add Habit"}
                </button>
            </form>
        </section>
    );
};

export default AddHabit;
