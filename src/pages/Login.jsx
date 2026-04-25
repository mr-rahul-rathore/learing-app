import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";


function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoogleSSO = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
        console.log(tokenResponse);
        
      const res = await axios.post("http://localhost:3000/api/web/google-login", {
        token: tokenResponse.access_token,
      });
      console.log('res----->',res);
      
      localStorage.setItem(
          "token",
          res.data.data.userData.session_token,
        );
        navigate("/");
      console.log(res.data);
    },
    onError: () => console.log("Login Failed"),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/login", formData);

      if (response.data.status == "success") {
        console.log(response.data.data.userData.session_token);

        alert("Login succesfully");
        localStorage.setItem(
          "token",
          response.data.data.userData.session_token,
        );
        navigate("/");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              placeholder="Enter your user name"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.username}
              onChange={handleChange}
              name="username"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label>
              <input type="checkbox" className="mr-1" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex justify-between items-center text-sm pt-2">
          <button
            // type="submit"
            onClick={handleGoogleSSO}
            disabled={loading}
            className="w-full bg-red-600 mr-5 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            SignIn With Google
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            SignIn With Github
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
