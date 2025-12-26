import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await authAPI.login(email, password);

      if (data?.success) {
        // Update AuthContext state
        login(data.user);
        // Redirect to previous page or home
        navigate(from, { replace: true });
      } else {
        setError(data?.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sage-800">Welcome Back</h1>
          <p className="text-sage-500 mt-2">
            Sign in to continue your wellness journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-lg p-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700"
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </button>

          <p className="text-sage-500 mt-2 flex items-center justify-center">
            Don't have an account?
            <Link to="/signup" className="text-sage-700 font-semibold hover:text-sage-800 ml-2">
                Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
