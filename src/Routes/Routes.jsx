import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import ProtectedRoute from "../Components/ProtectedRoute/ProtectedRoute";
import HabitDetails from "../Pages/HabitDetails";
import AddHabit from "../Pages/AddHabit";
import MyHabits from "../Pages/MyHabits";
import NotFound from "../Pages/NotFound";
import BrowseHabits from "../Pages/BrowseHabits";
import UpdateHabit from "../Components/UpdateHabit/UpdateHabit";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "browseHabits",
                element: <BrowseHabits />,
                loader: () => fetch("http://localhost:3000/publicHabits"),
            },
            {
                path: "addhabits",
                element: (
                    <ProtectedRoute>
                        <AddHabit />
                    </ProtectedRoute>
                ),
            },
            {
                path: "myhabits",
                element: (
                    <ProtectedRoute>
                        <MyHabits />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/habits/:id",

                element: (
                    <ProtectedRoute>
                        <HabitDetails></HabitDetails>
                    </ProtectedRoute>
                ),
            },
            {
                path: "/updateHabit/:id",
                element: (
                    <ProtectedRoute>
                        <UpdateHabit></UpdateHabit>
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
