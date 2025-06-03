import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";



export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "HELYAS" && password === "dagelan002") {
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Login berhasil!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } else {
      toast.error("Username atau password salah!");
    }
  };

  
  return (
    <div className="min-h-screen bg-[#fff7f7] flex justify-center items-center">
      <form
        onSubmit={handleLogin}
        className="w-[90%] max-w-md bg-white p-8 rounded-xl shadow-xl space-y-6"
      >
        <h1 className="text-2xl font-black text-[#DC2318] text-center">
          Admin Login
        </h1>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            className="w-full h-10 rounded-lg bg-[#f5f5f5] px-3 text-sm"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan Username"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full h-10 rounded-lg bg-[#f5f5f5] px-3 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan Password"
          />
        </div>
        <Toaster position="top-center" reverseOrder={false} />
        <button
          type="submit"
          className="w-full h-12 bg-[#DC2318] text-white rounded-full font-semibold hover:scale-95 transition"
        >
          Login
        </button>

        {/* Tombol kembali */}
        <Link
          to="/"
          className="block text-center text-sm text-[#DC2318] mt-3 underline hover:text-[#a81814] transition"
        >
          &larr; Kembali ke Halaman Pemesanan
        </Link>
      </form>
    </div>
  );
}
