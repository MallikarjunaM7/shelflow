import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from "../../../store/auth";

function Login() {
    const navigate = useNavigate();
    const { storeTokenInLS, token, storeShopIdInLS } = useAuth();
    const [action, setAction] = useState("SignUp");
    const [isOtp, setOtp] = useState(false);
    const backapi = "http://localhost:5000";
    const [formData, setFormData] = useState({
        adminName: "",
        email: "",
        password: "",
        otp: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        if (!isSubmitted) {
            try {
                const response = await fetch(`${backapi}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                const data = await response.json();
                if (data.alreadymsg) toast.error(data.alreadymsg);
                if (data.msg) {
                    toast.success(data.msg);
                    setIsSubmitted(true);
                    setOtp(true);
                }
            } catch (error) {
                console.error("SignUp Error:", error);
            }
        } else if (isOtp) {
            try {
                const response = await fetch(`${backapi}/api/auth/verifyotp/${formData.email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: formData.email, otp: formData.otp })
                });
                const data = await response.json();
                if (data.inmsg) toast.error(data.inmsg);
                else if (data.sucmsg) {
                    toast.success(data.sucmsg);
                    navigate("/login");
                }
            } catch (error) {
                console.error("OTP Verification Error:", error);
            }
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${backapi}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.message) toast.error(data.message);
            else if (data.sucmsg) {
                toast.success(data.sucmsg);
                storeTokenInLS(data.accessToken);
                storeShopIdInLS(data.admin.shopID);
                navigate("/home");
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        action === "SignUp" ? handleSignUpSubmit(event) : handleLoginSubmit(event);
    };

    if (token) return <Navigate to='/home' />;

    return (
        <div className="relative min-h-screen overflow-x-hidden bg-black">
            <video autoPlay loop muted playsInline className="absolute w-full h-full object-cover opacity-90 -z-10">
                <source src="/87789-602074264_small.mp4" type="video/mp4" />
            </video>
            <div className="mx-auto mt-12 mb-4 w-[90%] max-w-md rounded-lg border border-white/30 bg-white/20 p-6 shadow-md backdrop-blur-sm">
                <div className="flex flex-col items-center gap-2">
                    <h2 className="text-3xl font-bold text-purple-700">{action}</h2>
                    <div className="h-1 w-14 rounded-full bg-black"></div>
                </div>
                <form className="mt-4 flex flex-col items-center gap-4" onSubmit={handleFormSubmit}>
                    {action === "Login" ? null : (
                        <div className="w-full rounded-md bg-white px-3 py-2">
                            <input
                                type="text"
                                placeholder="Name"
                                name="adminName"
                                value={formData.adminName}
                                onChange={handleInputChange}
                                className="w-full border-none bg-transparent text-black outline-none"
                            />
                        </div>
                    )}
                    <div className="w-full rounded-md bg-white px-3 py-2">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border-none bg-transparent text-black outline-none"
                        />
                    </div>
                    <div className="w-full rounded-md bg-white px-3 py-2">
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className="w-full border-none bg-transparent text-black outline-none"
                        />
                    </div>
                    {isOtp && action === "SignUp" && (
                        <div className="flex flex-col items-center gap-2">
                            <p className="text-white">OTP has been sent to the registered Email ID.</p>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 4-digit OTP"
                                value={formData.otp}
                                onChange={handleInputChange}
                                autoComplete="off"
                                className="w-64 rounded-md px-3 py-2 text-black"
                            />
                        </div>
                    )}
                    {!isOtp && (
                        <div className="mt-8 mb-4 flex gap-4">
                            <div
                                className={`cursor-pointer rounded-full px-6 py-3 text-sm font-bold text-white ${action === "Login" ? "bg-purple-700" : "bg-purple-400 cursor-not-allowed"}`}
                                onClick={() => setAction("SignUp")}
                            >
                                Signup
                            </div>
                            <div
                                className={`cursor-pointer rounded-full px-6 py-3 text-sm font-bold text-white ${action === "SignUp" ? "bg-purple-700" : "bg-purple-400 cursor-not-allowed"}`}
                                onClick={() => setAction("Login")}
                            >
                                Login
                            </div>
                        </div>
                    )}
                    <button
                        type="submit"
                        className="mt-2 rounded-full bg-blue-500 px-6 py-3 text-white transition duration-300 hover:scale-105 hover:bg-blue-400 hover:shadow-md"
                    >
                        {isOtp && action === "SignUp" ? "Submit OTP" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
