
import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Context } from './Context/ContextData';

function Login() {
  let cont = useContext(Context);
  let [data, setUserData] = useState({ email: '', pwd: '' });
  let [msg, setMsg] = useState({ text: '', variant: '' });
  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setMsg({ text: '', variant: '' });

    if (data.email.length === 0 || data.pwd.length === 0) {
      setMsg({ text: 'Email or password cannot be empty', variant: 'error' });
      return;
    }

    let payload = { username: data.email, password: data.pwd };

    fetch('https://rbac-backend-90gr.onrender.com/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 400 || d.status === 500) {
          setMsg({ text: d.message, variant: 'error' });
          return;
        } else {
          setMsg({ text: d.message, variant: 'success' });

          if (d.message === 'Login successful') {
            window.localStorage.setItem('isLogin', 'true');
            let user = { role: d.user.role, email: d.user.email, _id: d.user._id };
            cont.setIsLogin('true');
            cont.setUser(user);

            setTimeout(() => {
              if (user.role === 'MENTOR') {
                navigate('/mentor-courses');
              } 
              else if (user.role === 'STUDENT') {
                navigate('/courses');
              }
              else {
                navigate('/profile');
              }
            }, 500);
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setMsg({ text: e.message, variant: 'error' });
      });
  }

  function handleChange(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-2xl font-bold text-center mb-6">Login</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={data.email}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="pwd"
            placeholder="Enter your password"
            value={data.pwd}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="submit"
            value="Login"
            className="bg-blue-500 text-white rounded-lg p-3 cursor-pointer hover:bg-blue-600 transition"
          />
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </NavLink>
        </p>

        {msg.text && (
          <p
            className={`mt-4 text-center text-sm ${msg.variant === 'error' ? 'text-red-600' : 'text-green-500'}`}
          >
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
