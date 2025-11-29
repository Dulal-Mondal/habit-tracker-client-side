import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

const FeaturedHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchHabits = async () => {
            try {
                const res = await fetch("https://habit-tracker-server-side.vercel.app/habitCards");
                const data = await res.json();
                setHabits(data);
            } catch (err) {
                console.error("Failed to fetch habits:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHabits();
    }, []);
    console.log(habits)

    if (loading) return <p className="text-center py-10">Loading habits...</p>;

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Featured Habits</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {habits.map((habit) => (
                    <div key={habit._id} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 transition-transform">
                        {habit.imageUrl ? (
                            <img src={habit.imageUrl} alt={habit.title} className="w-full h-48 object-cover" />
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )}
                        <div className="p-5 flex flex-col grow">
                            <h3 className="text-xl font-semibold mb-2">{habit.title}</h3>
                            <p className="text-gray-600 mb-3">{habit.description}</p>
                            <div className="text-sm text-gray-500 mb-3">
                                <p>Created by: <span className="font-medium">{habit.creator?.name || habit.creator?.email || "Unknown"}</span></p>
                                <p>Category: {habit.category}</p>
                                <p>Reminder: {habit.reminderTime}</p>
                            </div>
                            <Link
                                to={habit.isPrivate && !user ? "/login" : `/habits/${habit._id}`}
                                className="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedHabits;
