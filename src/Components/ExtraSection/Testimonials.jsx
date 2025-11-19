
import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
    { name: "Alice", feedback: "HabitTracker helped me stay consistent with my reading habit every day!" },
    { name: "Bob", feedback: "I love tracking my fitness routines with this app. It's simple and effective." },
    { name: "Charlie", feedback: "The streaks motivate me to maintain good habits and improve my focus." },
];

const Testimonials = () => {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-white shadow-lg rounded-lg p-6 relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                    >
                        <FaQuoteLeft className="text-2xl text-blue-500 absolute -top-3 left-3" />
                        <p className="text-gray-700 mb-4">{t.feedback}</p>
                        <FaQuoteRight className="text-2xl text-blue-500 absolute -bottom-3 right-3" />
                        <p className="text-right font-semibold mt-4">- {t.name}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
