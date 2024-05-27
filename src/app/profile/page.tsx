"use client";
// import axios, { AxiosResponse } from 'axios';
// import Link from "next/link";
// import React, {useState} from "react";
// import {toast} from "react-hot-toast";
// import {useRouter} from "next/navigation";

// interface UserData {
//     data: {
//       _id: string; // Assuming _id is a string
//       // Add other properties if present in your response data
//     };
//     // Add other properties if present in your response
//   }

// export default function ProfilePage() {
//     const router = useRouter()
//     const [data, setData] = useState("nothing")
//     const logout = async () => {
//         try {
//             await axios.get('/api/users/logout')
//             toast.success('Logout successful')
//             router.push('/login')
//         } catch (error:any) {
//             console.log(error.message);
//             toast.error(error.message)
//         }
//     }

//     const getUserDetails = async () => {
//         try {
//           const res: AxiosResponse<UserData> = await axios.get('/api/users/me');
//           console.log(res.data);
//           setData(res.data.data._id);
//         } catch (error) {
//           console.error('Failed to fetch user details:', error);
//           toast.error('Failed to fetch user details. Please try again.');
//         }
//       };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1>Profile</h1>
//             <hr />
//             <p>Profile page</p>
//             <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
//             </Link>}</h2>
//         <hr />
//         <button
//         onClick={logout}
//         className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >Logout</button>

//         <button
//         onClick={getUserDetails}
//         className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >GetUser Details</button>


//             </div>
//     )
// }

{/* <button onClick={getUserDetails}>Get user details</button>
        <p>{data}</p>

        <Link href="/">
            Home
        </Link>
        <button onClick={logout}>Logout</button> 
*/}

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get("/api/users/me");
            console.log(res.data.data._id);
            setData(res.data.data._id);
        } catch (error:any) {
            console.log(error.message);
            toast.error("Failed to fetch user details");                                    
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>
            <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
                <p className="text-lg mb-4 text-black">Welcome to your profile page!</p>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2 text-gray-700">User ID:</h2>
                    <p className="text-gray-700">
                        {data === "nothing" ? (
                            "Nothing"
                        ) : (
                            <Link href={`/profile/${data}`} className="text-blue-500 hover:underline">
                                {data}
                            </Link>
                        )}
                    </p>
                </div>
                <hr className="my-4" />
                <div className="space-x-4">
                    <button
                        onClick={logout}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
                    >
                        Logout
                    </button>
                    <button
                        onClick={getUserDetails}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded focus:outline-none"
                    >
                        Get User Details
                    </button>
                </div>
            </div>
        </div>
    );
}
