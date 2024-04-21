"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUser = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error : any) {
            setError(error.response ? error.response.data : 'An error occurred during verification.');
            // setError(true)

        }
    };

    useEffect(() => {
        setError(false)
        const urlToken = new URLSearchParams(window.location.search).get('token');
        setToken(urlToken || '');
    }, []);

    useEffect(() => {
        setError(false)
        if (token.length > 0) {
            verifyUser();
        }
    }, [token]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md">
                {verified ? (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-green-500 mb-4">Email Verified!</h2>
                        <p className="text-lg text-gray-700">Your email has been successfully verified.</p>
                        <p className="text-gray-600 mt-4">Token: {token}</p>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-blue-500 mb-4">Verifying Email...</h2>
                        {error && <p className="text-lg text-red-500 mb-4">{error}</p>}
                        <div className="spinner-border text-blue-500" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
