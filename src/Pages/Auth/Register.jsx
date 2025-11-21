import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { updateProfile } from "firebase/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HeadProvider, Title } from "react-head";

const Register = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");


    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    const handleRegister = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const photoURL = event.target.photoURL.value;

        if (!hasUppercase || !hasLowercase || !hasMinLength) {
            toast.error("❌ Please meet all password requirements!");
            return;
        }

        createUser(email, password)
            .then((result) => {
                const user = result.user;
                updateProfile(user, { displayName: name, photoURL })
                    .then(() => {
                        toast.success("✅ Registration Successful!");
                        setTimeout(() => navigate("/"), 1500);
                    })
                    .catch((error) => {
                        console.log("Profile update error:", error);
                        toast.error("⚠️ Profile update failed!");
                    });
            })
            .catch((error) => {
                console.error("Registration error:", error);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("✅ Google Login Successful!");
                setTimeout(() => navigate("/"), 1500);
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.message);
            });
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <HeadProvider>
                <Title>Good Habit | Register</Title>
            </HeadProvider>

            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
                    <div className="card-body">
                        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
                            Create Your Account
                        </h1>

                        <form onSubmit={handleRegister}>
                            <fieldset className="fieldset space-y-3">
                                <label className="label font-medium">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="input input-bordered w-full"
                                    placeholder="Your Name"
                                    required
                                />

                                <label className="label font-medium">Photo URL</label>
                                <input
                                    type="text"
                                    name="photoURL"
                                    className="input input-bordered w-full"
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                />

                                <label className="label font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="input input-bordered w-full"
                                    placeholder="Your Email"
                                    required
                                />

                                <label className="label font-medium">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input input-bordered w-full pr-10"
                                        placeholder="Password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOffIcon size={20} />
                                        ) : (
                                            <EyeIcon size={20} />
                                        )}
                                    </button>
                                </div>

                                <div className="text-sm mt-2 space-y-1">
                                    <p className={hasMinLength ? "text-green-600" : "text-red-500"}>
                                        • At least 6 characters
                                    </p>
                                    <p className={hasUppercase ? "text-green-600" : "text-red-500"}>
                                        • Contains an uppercase letter
                                    </p>
                                    <p className={hasLowercase ? "text-green-600" : "text-red-500"}>
                                        • Contains a lowercase letter
                                    </p>
                                </div>

                                <button className="btn btn-neutral mt-4 w-full">
                                    Register
                                </button>
                            </fieldset>
                        </form>

                        {/* Google Login */}
                        <button
                            onClick={handleGoogleSignIn}
                            className="btn mt-4 w-full border border-gray-300 bg-white hover:bg-gray-100 flex items-center justify-center gap-2"
                        >
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google Logo"
                                className="w-5 h-5"
                            />
                            Sign up with Google
                        </button>

                        <p className="text-center mt-3 text-gray-700">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 hover:text-blue-800 font-semibold"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default Register;
