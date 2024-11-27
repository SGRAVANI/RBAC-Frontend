
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "./Context/ContextData";
import { useContext, useState } from "react";

function Navbar() {
  const cont = useContext(Context);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogOut() {
    fetch("http://localhost:8080/auth/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("isLogin", "false");
        cont.setUser({});
        cont.setIsLogin("false");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Error occurred while logging out:", error);
      });
  }

  return (
    <nav className="bg-gray-800 text-white">
      {/* Top Navbar */}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-rose-400">
          <NavLink to="/">RBAC</NavLink>
        </h1>

        {/* Hamburger Icon */}
        <button
          className="lg:hidden block text-gray-400 hover:text-rose-400 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navbar Links (Desktop) */}
        <ul className="hidden lg:flex gap-6 items-center">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-rose-400 font-semibold" : "hover:text-rose-400"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-rose-400 font-semibold" : "hover:text-rose-400"
              }
              to="/courses"
            >
              Courses
            </NavLink>
          </li>
          {cont.isLogin === "false" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-rose-400 font-semibold"
                      : "hover:text-rose-400"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-rose-400 font-semibold"
                      : "hover:text-rose-400"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {cont.isLogin === "true" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-rose-400 font-semibold"
                      : "hover:text-rose-400"
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogOut();
                  }}
                  className="hover:text-rose-400 font-semibold"
                >
                  Logout
                </button>
              </li>
              {cont.user && cont.user.role === "ADMIN" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-rose-400 font-semibold"
                        : "hover:text-rose-400"
                    }
                    to="/manageusers"
                  >
                    Manage Users
                  </NavLink>
                </li>
              )}
              {cont.user.role === "MENTOR" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-rose-400 font-semibold"
                        : "hover:text-rose-400"
                    }
                    to="/mentor-courses"
                  >
                    Manage Courses
                  </NavLink>
                </li>
              )}
              <li>
                {/* Display user's email */}
                <p className="text-sm text-white font-semibold">
                  Hello, {cont.user.email}!
                </p>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <ul className="bg-gray-900 text-white p-4 space-y-4 lg:hidden">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-rose-400 font-semibold" : "hover:text-rose-400"
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          {cont.isLogin === "false" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-rose-400 font-semibold"
                      : "hover:text-rose-400"
                  }
                  to="/login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-rose-400 font-semibold"
                      : "hover:text-rose-400"
                  }
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
          {cont.isLogin === "true" && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "text-rose-400 font-semibold"
                      : "hover:text-rose-400"
                  }
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
             
              {cont.user && cont.user.role === "ADMIN" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-rose-400 font-semibold"
                        : "hover:text-rose-400"
                    }
                    to="/manageusers"
                  >
                    Manage Users
                  </NavLink>
                </li>
              )}
              {cont.user.role === "MENTOR" && (
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "text-rose-400 font-semibold"
                        : "hover:text-rose-400"
                    }
                    to="/courses"
                  >
                    Manage Courses
                  </NavLink>
                </li>

              )}
              {cont.isLogin=="true" &&  <li>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogOut();
                  }}
                  className="hover:text-rose-400 font-semibold"
                >
                  Logout
                </button>
              </li>}
              <li>
                <p className="text-sm text-white font-semibold">
                  Hello, {cont.user.email}!
                </p>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
