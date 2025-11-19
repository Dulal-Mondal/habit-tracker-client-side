import React from "react";
import { motion } from "framer-motion";
import { FaPlusCircle, FaCheckCircle, FaChartLine } from "react-icons/fa";

const steps = [
    { icon: <FaPlusCircle className="text-4xl text-blue-500 mb-2" />, title: "Add Habits", desc: "Create new daily habits easily and track your progress." },
    { icon: <FaCheckCircle className="text-4xl text-green-500 mb-2" />, title: "Track Progress", desc: "Check off habits daily and maintain streaks." },
    { icon: <FaChartLine className="text-4xl text-red-500 mb-2" />, title: "See Growth", desc: "Visualize your habit consistency and improvement over time." },
];

const HowItWorks = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        className="bg-gray-50 shadow-lg rounded-lg p-6 text-center hover:scale-105 transition-transform"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.2 }}
                    >
                        {step.icon}
                        <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
