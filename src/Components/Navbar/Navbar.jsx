import React, { useContext, useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import logoImg from '../../assets/Goodhabit-.png'
import "./Navbar.css";

const Navbar = () => {
    const { user, signOutUser, loading } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleSignOut = () => {
        signOutUser()
            .then(() => console.log("User logged out"))
            .catch((error) => console.log(error));
        setDropdownOpen(false);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const links = (
        <>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Home
            </NavLink>
            <NavLink
                to="/browseHabits"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Browse Public Habits
            </NavLink>

            {user && (
                <>
                    <NavLink
                        to="/addhabits"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Add Habit
                    </NavLink>

                    <NavLink
                        to="/myhabits"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        My Habits
                    </NavLink>
                </>
            )}
        </>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center py-4 bg-base-100 shadow-sm sticky top-0 z-50">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <nav className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>

                <NavLink to="/">
                    <span className="btn btn-ghost normal-case text-3xl text-blue-600 font-bold ">

                        <div className="flex items-center gap-1 mb-4 md:mb-0">
                            <img
                                src={logoImg}
                                alt="HabitTracker Logo"
                                className="w-15 h-15"
                            />
                            <span>GoodHabit</span>
                        </div>
                    </span>
                </NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>

            <div className="navbar-end flex items-center gap-3">
                {user ? (
                    <div className="relative" ref={dropdownRef}>

                        <img
                            src={
                                user.photoURL ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        />


                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="p-3 text-center">
                                    <p className="font-semibold text-gray-800">
                                        {user.displayName || "No Name"}
                                    </p>
                                    <p className="text-sm text-gray-500">{user.email}</p>
                                </div>
                                <div className="border-t border-gray-200"></div>
                                <button
                                    onClick={handleSignOut}
                                    className="w-full bg-blue-300 text-center px-4 py-2 text-red-500 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavLink to="/login" className="btn btn-primary">
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
