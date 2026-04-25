import { isAction } from "@reduxjs/toolkit"
import { NavLink } from "react-router-dom"

function Sidebar() {
  const linkClass =
    "block px-4 py-2 rounded transition"

  return (
    <div className="w-64 bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-6">Logo</h2>

      <nav className="space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Users
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Settings
        </NavLink>
        <NavLink
          to="/payments"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Payments
        </NavLink>

        <NavLink
          to="/counter"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Counter
        </NavLink>
        <NavLink
          to="/postal_master_list"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`
          }
        >
          Postal Master
        </NavLink>
        <NavLink to="/todo_list" className={({isActive}) =>
        
        `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`}>
              Todo
        </NavLink>
        <NavLink to="/postal_redux" className={({isActive}) =>
        
        `${linkClass} ${
              isActive ? "bg-gray-700" : "hover:bg-gray-800"
            }`}>
              Postal Redux
        </NavLink>
      </nav>
    </div>
  )
}

export default Sidebar
