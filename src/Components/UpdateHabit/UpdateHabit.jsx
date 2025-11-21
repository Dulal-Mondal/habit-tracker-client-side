import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import Swal from "sweetalert2";

const categories = ["Morning", "Work", "Fitness", "Evening", "Study"];

const UpdateHabit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [habitData, setHabitData] = useState({
        title: "",
        description: "",
        category: "",
        reminderTime: "",
        imageUrl: "",
        userName: "",
        userEmail: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchHabit = async () => {
            try {
                const res = await apiClient.get(`/habits/${id}`);
                setHabitData(res.data);
                if (res.data.imageUrl) setPreview(res.data.imageUrl);
            } catch (err) {
                console.error("Failed to fetch habit:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHabit();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabitData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);

        try {
            const formData = new FormData();
            formData.append("title", habitData.title);
            formData.append("description", habitData.description);
            formData.append("category", habitData.category);
            formData.append("reminderTime", habitData.reminderTime);

            if (imageFile) formData.append("image", imageFile);

            const res = await apiClient.patch(`/habits/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            Swal.fire("Success", "Habit updated successfully!", "success");
            navigate("/myhabits");
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to update habit", "error");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p className="text-center py-9">Loading...</p>;

    return (
        <section className="max-w-3xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Update Habit</h2>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4"
            >
                <input
                    type="text"
                    name="title"
                    value={habitData.title}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded"
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={habitData.description}
                    onChange={handleChange}
                    className="border px-4 py-2 rounded"
                    placeholder="Description"
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
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
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
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border px-4 py-2 rounded"
                />
                {preview && (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-40 h-40 object-cover rounded mt-2"
                    />
                )}

                <input
                    type="text"
                    value={habitData.userName}
                    readOnly
                    className="border px-4 py-2 rounded bg-gray-100"
                />
                <input
                    type="email"
                    value={habitData.userEmail}
                    readOnly
                    className="border px-4 py-2 rounded bg-gray-100"
                />

                <button
                    type="submit"
                    disabled={updating}
                    className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${updating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                >
                    {updating ? "Updating..." : "Update Habit"}
                </button>
            </form>
        </section>
    );
};

export default UpdateHabit;
