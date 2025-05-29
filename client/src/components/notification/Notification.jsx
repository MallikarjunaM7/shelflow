import React from 'react';
import Navbar from '../essentials/Navbar';

function Notification({ notification }) {
    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto mt-8 p-6 bg-blue-200 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Notifications
                </h2>
                <table className="w-full border-collapse font-sans">
                    <thead>
                        <tr className="bg-blue-400 text-white">
                            <th className="text-left py-3 px-4 border border-blue-300 font-bold">Notification Type</th>
                            <th className="text-left py-3 px-4 border border-blue-300 font-bold">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notification.map((notif, index) => (
                            <tr
                                key={index}
                                className={`border border-blue-300 ${
                                    index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
                                } hover:bg-blue-100`}
                            >
                                <td className="py-3 px-4 font-semibold text-gray-800 border border-blue-300">
                                    {notif.notificationType}
                                </td>
                                <td className="py-3 px-4 text-gray-700 border border-blue-300">
                                    {notif.description}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Notification;
