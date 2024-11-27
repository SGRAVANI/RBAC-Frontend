
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://rbac-backend-2wqn.onrender.com/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 400) {
          alert(d.message);
        } else {
          setUsers(d.users);
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  }, []);

  const handleViewProfile = (userId) => {
    navigate(`/profile?id=${userId}`);
  };
    
  const handleChange = (e, id) => {
    setUsers((prevArray) => {
      return prevArray.map((user) =>
        user._id === id ? { ...user, role: e.target.value } : user
      );
    });
  };

  const handleRoleChange = (userId, newRole) => {
    fetch(`https://rbac-backend-2wqn.onrender.com/admin/updateRole/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role: newRole }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 200) {
          alert(d.message);
          setUsers((prev) =>
            prev.map((user) =>
              user._id === userId ? { ...user, role: newRole } : user
            )
          );
        } else {
          alert(d.message);
        }
      })
      .catch((e) => {
        alert("Error updating role: " + e.message);
      });
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`https://rbac-backend-2wqn.onrender.com/admin/deleteUser/${userId}`, {
        method: "DELETE",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((d) => {
          if (d.status === 200) {
            alert(d.message);
            setUsers((prev) => prev.filter((user) => user._id !== userId));
          } else {
            alert(d.message);
          }
        })
        .catch((e) => {
          alert("Error deleting user: " + e.message);
        });
    }
  };

  const handleStatusChange = (userId, currentStatus) => {
    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    fetch(`https://rbac-backend-2wqn.onrender.com/admin/updateStatus/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 200) {
         
          setUsers((prev) =>
            prev.map((user) =>
              user._id === userId ? { ...user, status: newStatus } : user
            )
          );
          setTimeout(()=>{
            alert(d.message);
          },200)
          
        } else {
          alert(d.message);
        }
      })
      .catch((e) => {
        alert("Error updating status: " + e.message);
      });
  };

  return (
    <div className="w-full p-4 bg-gray-50 min-h-screen">
      {users && users.length > 0 ? (
        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            User Details
          </h2>
          <table className="w-full border border-gray-300 bg-white text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2 text-gray-600">User ID</th>
                <th className="border px-4 py-2 text-gray-600">Email</th>
                <th className="border px-4 py-2 text-gray-600">Role</th>
                <th className="border px-4 py-2 text-gray-600">Status</th>
                <th className="border px-4 py-2 text-gray-600">Update Role</th>
                <th className="border px-4 py-2 text-gray-600">Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-50 transition-colors`}
                >
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => handleViewProfile(user._id)}
                    >
                      {user._id}
                    </button>
                  </td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <select
                      className="w-full border rounded px-2 py-1"
                      value={user.role}
                      onChange={(e) => handleChange(e, user._id)}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="STUDENT">STUDENT</option>
                      <option value="MENTOR">MENTOR</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <Switch
                      checked={user.status === "ACTIVE"}
                      onChange={(e) => 
                      {
                        console.log(e.target.value);

                        handleStatusChange(user._id, user.status)}
                      }
                    />
                    <span>{user.status}</span>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleRoleChange(user._id, user.role)}
                    >
                      Update
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-10 text-gray-600">No users found.</p>
      )}
    </div>
  );
}

export default ManageUsers;
