import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { HeadProvider, Title } from "react-head";
import { motion } from "framer-motion";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const Login = () => {
    const { signInUser, signInWithGoogle } = useContext(AuthContext);
    const [emailInputValue, setEmailInputValue] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogIn = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            const result = await signInUser(email, password);
            console.log("Logged in user:", result.user);

            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome back to Good Habit 🎉",
                timer: 2000,
                showConfirmButton: false,
            });

            event.target.reset();
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message,
            });
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();

            Swal.fire({
                icon: "success",
                title: "Google Login Successful!",
                text: "Welcome to Good Habit 🎉",
                timer: 2000,
                showConfirmButton: false,
            });

            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Google Login Failed",
                text: error.message,
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-blue-100 to-purple-100 p-4">
            <HeadProvider>
                <Title>Good Habit | Login</Title>
            </HeadProvider>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8"
            >
                <h1 className="text-4xl font-bold text-center mb-6 bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Welcome Back 👋
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Login to continue your habit journey
                </p>


                <form onSubmit={handleLogIn}>
                    <div className="mb-5">
                        <label className="label font-medium">Email</label>
                        <input
                            type="email"
                            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 transition-all"
                            name="email"
                            placeholder="Enter your email"
                            value={emailInputValue}
                            onChange={(e) => setEmailInputValue(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="label font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="input input-bordered w-full focus:ring-2 focus:ring-purple-400 transition-all pr-10"
                                name="password"
                                placeholder="Enter your password"
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
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="btn bg-linear-to-r from-blue-500 to-purple-600 text-white w-full border-none mt-2"
                    >
                        Login
                    </motion.button>
                </form>


                <div className="flex items-center my-6">
                    <div className="grow border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">or</span>
                    <div className="grow border-t border-gray-300"></div>
                </div>


                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGoogleSignIn}
                    className="btn bg-white text-gray-800 border border-gray-300 w-full flex items-center justify-center gap-2 hover:bg-gray-100"
                >
                    <svg
                        width="18"
                        height="18"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                    >
                        <path fill="#fff" d="M0 0h512v512H0z" />
                        <path
                            fill="#34a853"
                            d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        />
                        <path
                            fill="#4285f4"
                            d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        />
                        <path
                            fill="#fbbc02"
                            d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        />
                        <path
                            fill="#ea4335"
                            d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        />
                    </svg>
                    Login with Google
                </motion.button>

                <p className="text-center mt-6 text-gray-600">
                    New here?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Create an account
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
