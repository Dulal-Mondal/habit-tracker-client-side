import React from "react";
import { FaBrain, FaSmile, FaClock, FaBullseye } from "react-icons/fa";

const benefits = [
    { icon: <FaBrain className="text-4xl text-blue-500 mb-2" />, title: "Better Focus", desc: "Habits improve your concentration and mental clarity." },
    { icon: <FaSmile className="text-4xl text-yellow-500 mb-2" />, title: "Reduced Stress", desc: "Building habits reduces anxiety and stress over time." },
    { icon: <FaClock className="text-4xl text-green-500 mb-2" />, title: "Time Management", desc: "Habits help you manage your daily routine effectively." },
    { icon: <FaBullseye className="text-4xl text-red-500 mb-2" />, title: "Achieve Goals", desc: "Consistent habits help you reach your long-term objectives." },
];

const WhyBuildHabits = () => {
    return (
        <section className="bg-gray-50 py-16 px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Why Build Habits?</h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                {benefits.map((b, idx) => (
                    <div key={idx} className="bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform">
                        {b.icon}
                        <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                        <p className="text-gray-600">{b.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyBuildHabits;
