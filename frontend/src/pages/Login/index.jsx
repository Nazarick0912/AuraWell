import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; //

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth(); // Access the global login function

  const from = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // 1. Call your Java LoginServlet
      const response = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // CRITICAL: This allows the browser to save the JSESSIONID cookie
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // 2. Update the AuthContext state so the Navbar greets you
        login(data.user); 
        
        // 3. Redirect back to where the user was (or Home)
        navigate(from, { replace: true });
      } else {
        // 4. Show the error message from your Java catch block
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server connection failed. Is Tomcat running on port 9090?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-cream-200">
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
            <label className="block text-sm font-medium text-sage-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-cream-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-sage-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-cream-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-sage-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-red-500 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sage-600 text-white py-3 rounded-lg hover:bg-sage-700 transition duration-200 font-medium disabled:bg-sage-300"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <p className="text-sage-500 mt-6 flex items-center justify-center text-sm">
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