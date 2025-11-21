// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import apiClient from "../services/apiClient";
// import Swal from "sweetalert2";

// const MyHabits = () => {
//     const { user } = useContext(AuthContext);
//     const [habits, setHabits] = useState([]);

//     useEffect(() => {
//         if (user?.email) fetchMyHabits();
//     }, [user]);

//     const fetchMyHabits = async () => {
//         try {
//             const res = await apiClient.get(`/myHabits/${user.email}`);
//             setHabits(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const deleteHabit = async (id) => {
//         const confirm = await Swal.fire({
//             title: "Are you sure?",
//             text: "This habit will be deleted!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: "Yes, delete it!",
//         });

//         if (confirm.isConfirmed) {
//             try {
//                 await apiClient.delete(`/habits/${id}`);
//                 setHabits(habits.filter((h) => h._id !== id));
//                 Swal.fire("Deleted!", "Habit has been deleted.", "success");
//             } catch (err) {
//                 console.error(err);
//                 Swal.fire("Error", "Failed to delete habit", "error");
//             }
//         }
//     };

//     const markComplete = async (id) => {
//         const today = new Date().toISOString().split("T")[0];
//         try {
//             const res = await apiClient.patch(`/habits/complete/${id}`, { date: today });
//             setHabits(habits.map((h) => (h._id === id ? res.data : h)));
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <section className="max-w-6xl mx-auto px-4 py-10">
//             <h2 className="text-3xl font-bold mb-6 text-center">My Habits</h2>

//             {/* Responsive Table Wrapper */}
//             <div className="overflow-x-auto shadow rounded-lg">
//                 <table className="w-full border-collapse text-left min-w-[700px]">
//                     <thead>
//                         <tr className="bg-gray-200">
//                             <th className="p-2 border">Title</th>
//                             <th className="p-2 border">Category</th>
//                             <th className="p-2 border">Current Streak</th>
//                             <th className="p-2 border">Created Date</th>
//                             <th className="p-2 border">Actions</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {habits.map((habit) => (
//                             <tr key={habit._id} className="border-b">
//                                 <td className="p-2 border">{habit.title}</td>
//                                 <td className="p-2 border">{habit.category}</td>
//                                 <td className="p-2 border">{habit.currentStreak || 0}</td>
//                                 <td className="p-2 border">
//                                     {new Date(habit.createdAt).toLocaleDateString()}
//                                 </td>

//                                 {/* Mobile-friendly action buttons */}
//                                 <td className="p-2 border">
//                                     <div className="flex flex-wrap gap-2">
//                                         <button
//                                             className="bg-green-500 text-white px-3 py-1 rounded w-full sm:w-auto"
//                                             onClick={() => markComplete(habit._id)}
//                                         >
//                                             Complete
//                                         </button>

//                                         <button
//                                             className="bg-yellow-500 text-white px-3 py-1 rounded w-full sm:w-auto"
//                                             onClick={() =>
//                                                 (window.location.href = `/updateHabit/${habit._id}`)
//                                             }
//                                         >
//                                             Update
//                                         </button>

//                                         <button
//                                             className="bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto"
//                                             onClick={() => deleteHabit(habit._id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </section>
//     );

// };

// export default MyHabits;


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import apiClient from "../services/apiClient";
import Swal from "sweetalert2";

const MyHabits = () => {
    const { user } = useContext(AuthContext);
    const [habits, setHabits] = useState([]);

    useEffect(() => {
        if (user?.email) fetchMyHabits();
    }, [user]);

    const fetchMyHabits = async () => {
        try {
            const res = await apiClient.get(`/myHabits/${user.email}`);
            setHabits(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const deleteHabit = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This habit will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        });

        if (confirm.isConfirmed) {
            try {
                await apiClient.delete(`/habits/${id}`);
                setHabits(habits.filter((h) => h._id !== id));
                Swal.fire("Deleted!", "Habit has been deleted.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error", "Failed to delete habit", "error");
            }
        }
    };

    const markComplete = async (id) => {
        const today = new Date().toISOString().split("T")[0];
        try {
            const res = await apiClient.patch(`/habits/complete/${id}`, { date: today });
            setHabits(habits.map((h) => (h._id === id ? res.data : h)));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-4 py-10 w-full overflow-x-hidden">
            <h2 className="text-3xl font-bold mb-6 text-center">My Habits</h2>

            {/* Desktop Table */}
            <div className="hidden md:block w-full overflow-hidden">
                <table className="w-full border-collapse text-left table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border">Title</th>
                            <th className="p-2 border">Category</th>
                            <th className="p-2 border">Current Streak</th>
                            <th className="p-2 border">Created Date</th>
                            <th className="p-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habits.map((habit) => (
                            <tr key={habit._id} className="border-b">
                                <td className="p-2 border">{habit.title}</td>
                                <td className="p-2 border">{habit.category}</td>
                                <td className="p-2 border">{habit.currentStreak || 0}</td>
                                <td className="p-2 border">{new Date(habit.createdAt).toLocaleDateString()}</td>
                                <td className="p-2 border flex gap-2 flex-wrap">
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                                        onClick={() => markComplete(habit._id)}
                                    >
                                        Complete
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                                        onClick={() => window.location.href = `/updateHabit/${habit._id}`}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                                        onClick={() => deleteHabit(habit._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden w-full flex flex-col items-center space-y-4 overflow-x-hidden">
                {habits.map((habit) => (
                    <div
                        key={habit._id}
                        className="border rounded-lg p-4 shadow bg-white w-11/12 max-w-sm overflow-hidden"
                    >
                        <h3 className="font-bold text-lg truncate">{habit.title}</h3>
                        <p className="text-sm text-gray-600 truncate">Category: {habit.category}</p>
                        <p className="text-sm text-gray-600">Streak: {habit.currentStreak || 0}</p>
                        <p className="text-sm text-gray-600">
                            Created: {new Date(habit.createdAt).toLocaleDateString()}
                        </p>

                        <div className="flex gap-2 mt-3 flex-wrap w-full">
                            <button
                                className="bg-green-500 text-white px-2 py-1 rounded text-xs flex-1"
                                onClick={() => markComplete(habit._id)}
                            >
                                Complete
                            </button>
                            <button
                                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs flex-1"
                                onClick={() => window.location.href = `/updateHabit/${habit._id}`}
                            >
                                Update
                            </button>
                            <button
                                className="bg-red-500 text-white px-2 py-1 rounded text-xs flex-1"
                                onClick={() => deleteHabit(habit._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MyHabits;
