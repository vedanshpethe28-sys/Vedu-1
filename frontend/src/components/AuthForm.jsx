import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthForm = ({ mode }) => {
  const isSignup = mode === "signup";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(form, isSignup ? "/auth/signup" : "/auth/login");
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <form className="space-y-4 rounded-2xl bg-slate-900 p-8" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold">{isSignup ? "Create account" : "Welcome back"}</h2>
      {isSignup && (
        <input
          className="w-full rounded-xl bg-slate-800 px-4 py-3"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      )}
      <input
        className="w-full rounded-xl bg-slate-800 px-4 py-3"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full rounded-xl bg-slate-800 px-4 py-3"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button className="w-full rounded-xl bg-brand px-4 py-3 font-semibold">
        {isSignup ? "Sign up" : "Login"}
      </button>
    </form>
  );
};

export default AuthForm;
