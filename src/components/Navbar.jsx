import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()
  function handelSubmit() {
    navigate("/login");
  }
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handelLogout () {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-semibold">My Learnig APP</h1>
      <div className="">
        {isLoggedIn ? <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition" type="submit"
        onClick={handelLogout}>
          Logout
        </button> : <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition" type="submit"
        onClick={handelSubmit}>
          Login
        </button> }
        
      </div>
    </div>
  );
}

export default Navbar;
