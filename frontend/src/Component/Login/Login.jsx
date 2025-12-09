import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Simulate login success
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate(from, { replace: true });
    } catch (err) {
      setError("Login failed");
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
        </form>
      </div>
    </div>
  );
}
