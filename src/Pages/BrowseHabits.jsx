import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

const BrowseHabits = () => {
    const initialHabits = useLoaderData();
    const [habits, setHabits] = useState(initialHabits || []);
    const [visibleCount, setVisibleCount] = useState(6);

    const [searchText, setSearchText] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");

    const loadMore = () => setVisibleCount((prev) => prev + 6);

    const filteredHabits = habits.filter((habit) => {
        const matchesText =
            habit.title.toLowerCase().includes(searchText.toLowerCase()) ||
            habit.description.toLowerCase().includes(searchText.toLowerCase());
        const matchesCategory = categoryFilter
            ? habit.category.toLowerCase() === categoryFilter.toLowerCase()
            : true;
        return matchesText && matchesCategory;
    });

    const visibleHabits = filteredHabits.slice(0, visibleCount);

    const categories = [
        ...new Set(habits.map((habit) => habit.category).filter(Boolean)),
    ];

    return (
        <section className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Browse All Habits</h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center">
                <input
                    type="text"
                    placeholder="Search by title or description"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border rounded px-4 py-2 w-full sm:w-1/2"
                />

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="border rounded px-4 py-2 w-full sm:w-1/4"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {visibleHabits.length === 0 && (
                <p className="text-center text-gray-500">No habits found.</p>
            )}

            <div className="grid md:grid-cols-3 gap-6">
                {visibleHabits.map((habit) => (
                    <div
                        key={habit._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-transform hover:scale-105"
                    >

                        {habit.imageUrl && (
                            <img
                                src={habit.imageUrl}
                                alt={habit.title}
                                className="w-full h-48 object-cover"
                            />
                        )}

                        <div className="p-5 flex flex-col grow">
                            <div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                                    {habit.title}
                                </h3>
                                <p className="text-gray-600 mb-3">{habit.description}</p>
                            </div>

                            <div className="text-sm text-gray-500 mb-3">
                                <p>
                                    Created by:{" "}
                                    <span className="font-medium">
                                        {habit.userName || habit.userEmail || "Unknown"}
                                    </span>
                                </p>
                            </div>

                            <a
                                href={`/habits/${habit._id}`}
                                className="mt-auto inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
                            >
                                View Details
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {visibleCount < filteredHabits.length && (
                <div className="text-center mt-6">
                    <button
                        onClick={loadMore}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Load More
                    </button>
                </div>
            )}
        </section>
    );
};

export default BrowseHabits;
