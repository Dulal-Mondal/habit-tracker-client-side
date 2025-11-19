
import React from "react";
import logoImg from '../../assets/Goodhabit-.png'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">

                <NavLink to="/">
                    <span className="btn btn-ghost normal-case text-3xl text-blue-600 font-bold ">


                        <img
                            src={logoImg}
                            alt="HabitTracker Logo"
                            className="w-15 h-15"
                        />
                        <span >GoodHabit</span>

                    </span>
                </NavLink>


                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p>Email: support@habittracker.com</p>
                    <p>📞 Contact: 01726526555</p>
                    <p>📄 <a href="/terms" className="underline hover:text-blue-400">Terms & Conditions</a></p>
                </div>


                <div className="flex gap-4 text-2xl">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500"><FaInstagram /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-600"><FaLinkedin /></a>
                </div>
            </div>

            <p className="text-center text-gray-400 mt-6">
                &copy; {new Date().getFullYear()} GoodHabit
            </p>
        </footer>
    );
};

export default Footer;
