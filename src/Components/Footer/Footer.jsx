import React from "react";
import logoImg from '../../assets/Goodhabit-.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">


                <NavLink to="/" className="flex items-center gap-2">
                    <img
                        src={logoImg}
                        alt="HabitTracker Logo"
                        className="w-10 h-10 md:w-12 md:h-12 object-contain"
                    />
                    <span className="text-2xl md:text-3xl font-bold text-blue-500">
                        GoodHabit
                    </span>
                </NavLink>


                <div className="text-center md:text-left">
                    <p>Email: support@habittracker.com</p>
                    <p>📞 Contact: 01726526555</p>
                    <p>
                        📄
                        <a href="/terms" className="underline hover:text-blue-400 ml-1">
                            Terms & Conditions
                        </a>
                    </p>
                </div>

                <div className="flex gap-5 text-2xl">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500">
                        <FaFacebook />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
                        <FaTwitter />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">
                        <FaInstagram />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
                        <FaLinkedin />
                    </a>
                </div>
            </div>


            <p className="text-center text-gray-400 mt-6">
                &copy; {new Date().getFullYear()} GoodHabit
            </p>
        </footer>
    );
};

export default Footer;
