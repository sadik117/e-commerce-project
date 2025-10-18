/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
  const { signIn, setUser, googleSignIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //  Firebase login
      const userCredential = await signIn(
        formData.email,
        formData.password
      );
      const firebaseUser = userCredential.user;

      //  Update context
      setUser(firebaseUser);

      // Sync with backend (optional)
      const userData = {
        name: firebaseUser.displayName || "",
        email: firebaseUser.email,
        uid: firebaseUser.uid,
        provider:
          firebaseUser.providerData[0]?.providerId || "password",
        lastLogin: new Date().toISOString(),
      };

      await axios.post("http://localhost:3000/users", userData);

      toast.success("Login successful!");
      navigate(location.state?.from || "/");
    } catch (error) {
      console.error(error);
      toast.error("Login failed: " + error.message);
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(async (result) => {
        const user = result.user;
        setUser(user);

        const userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          provider: "google",
          lastLogin: new Date().toISOString(),
        };

        await axios.post("http://localhost:3000/users", userData);

        toast.success("Google Sign-In successful!");
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        toast.error("Google Sign-In failed!");
      });
  };

  //  UI 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1a2238] px-4 py-20">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-md text-white font-semibold"
          >
            Log In
          </button>
        </form>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 px-4 py-2 mt-4 border border-white/30 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 488 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M488 261.8c0-17.8-1.5-35-4.3-51.7H249v97.9h135.4c-5.9 32-23.9 59-51 77.1v63.9h82.4c48.3-44.5 76.2-110.1 76.2-187.2z"
            />
            <path
              fill="#ffffff"
              d="M249 492c69.6 0 128-22.9 170.6-62.3l-82.4-63.9c-23 15.4-52.5 24.4-88.2 24.4-67.8 0-125.3-45.8-145.9-107.5H19v67.7C61.5 431.3 148.4 492 249 492z"
            />
            <path
              fill="#ffffff"
              d="M103.1 282.7c-4.8-14.4-7.6-29.7-7.6-45.4s2.7-31 7.6-45.4V124.2H19C6.6 149.2 0 177.1 0 206.3s6.6 57.1 19 82.1l84.1-65.7z"
            />
            <path
              fill="#ffffff"
              d="M249 97.5c37.8 0 71.6 13 98.2 38.5l73.6-73.6C377 25.1 318.6 0 249 0 148.4 0 61.5 60.7 19 149.3l84.1 65.7C123.7 143.3 181.2 97.5 249 97.5z"
            />
          </svg>
          Sign in with Google
        </button>

        <p className="text-center text-sm text-white/70 mt-4">
          Don’t have an account?{" "}
          <Link to="/auth/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
