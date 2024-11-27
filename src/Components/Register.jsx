// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// function Register() {
//     let [data,setUserData]=useState({email:'',pwd:'',cpwd:'',name:''})
//     let [msg,setMsg]=useState({text:'',variant:""})
//     let navigate=useNavigate()
//     function handleSubmit(e)
//     {
//      e.preventDefault()
//      setMsg({text:'',variant:''})
//      if(data.email.length==0 ||data.pwd.length==0||data.cpwd.length==0||data.name.length==0)
//      {  setMsg({text:"email || password can not be empty",variant:"error"})
//         return
//      }
//      if(data.pwd!=data.cpwd)
//      {
//         setMsg({text:"pwd is not matching with confirm pwd",variant:"error"})
  
//       //  alert("pwd is not matching with confirm pwd")
//         return
//      }
//      let re=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
//      if(!re.test(data.pwd))
//      {
//         setMsg({text:"pwd is must contain atleast 1 lowecase, 1 uppercase, 1 special symbol and 1 digit",variant:"error"})
//         return
  
//      }
//      let payload={username:data.email,password:data.pwd,name:data.name}
//      console.log(payload)
//      fetch("http://localhost:8080/auth/register",{
//         method:"POST",
//         body:JSON.stringify(payload),
//         headers:{
//             "Content-Type":"application/json"
//         },
        

//      })
//      .then((res)=>{
           
//        return res.json()
        
//      })
//      .then((d)=>{
//         if(d.status==400||d.status==500)
//         {
//             setMsg({text:d.message,variant:"error"})
//         }
//       else{
//         console.log(d)
//         setMsg({text:d.message,variant:"success"})
//         setTimeout(()=>{
//             navigate("/login")
//            },500)
//       }
//      })
//      .catch((e)=>{
//         console.log(e)
//         setMsg({text:e.message,variant:"error"})
//      })
//     }
//     function handleChannge(e)
//     {
            
// setUserData((prev)=>{return{
// ...prev,[e.target.name]:e.target.value
// }})
//     }
//   return (
//     <div>
//         <h2> Register</h2>
//         <form action="" className='flex flex-col gap-5' onSubmit={handleSubmit}>
            
//                 <input type="text" name="email" placeholder='enter your email here' id='email' onChange={handleChannge} value={data.email}/>
//                 <input type="text" name="name" placeholder='enter your name' id="password" onChange={handleChannge} value={data.name} required/>
//                 <input type="password" name="pwd" placeholder='enter your password' id="password" onChange={handleChannge} value={data.pwd}/>
                
//                 <input type="password" name="cpwd" placeholder='confirm password' onChange={handleChannge} value={data.cpwd}/>
//                 <input type="submit" value="Register" />

            
//         </form>
//         <p>Already have an account? <NavLink to="/">Login</NavLink></p>
//         <p className={msg.variant=="error"?"text-red-600":"text-green-500"}>{msg.text}</p>
//     </div>
//   )
// }

// export default Register

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Register() {
  const [data, setUserData] = useState({ email: '', pwd: '', cpwd: '', name: '' });
  const [msg, setMsg] = useState({ text: '', variant: '' });
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setMsg({ text: '', variant: '' });

    if (data.email.length === 0 || data.pwd.length === 0 || data.cpwd.length === 0 || data.name.length === 0) {
      setMsg({ text: "Email, password, and name cannot be empty", variant: "error" });
      return;
    }

    if (data.pwd !== data.cpwd) {
      setMsg({ text: "Passwords do not match", variant: "error" });
      return;
    }

    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!re.test(data.pwd)) {
      setMsg({ text: "Password must contain at least 1 lowercase, 1 uppercase, 1 special symbol, and 1 digit", variant: "error" });
      return;
    }

    const payload = { username: data.email, password: data.pwd, name: data.name };
    console.log(payload);

    fetch("http://localhost:8080/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.status === 400 || d.status === 500) {
          setMsg({ text: d.message, variant: "error" });
        } else {
          setMsg({ text: d.message, variant: "success" });
          setTimeout(() => {
            navigate("/login");
          }, 500);
        }
      })
      .catch((e) => {
        console.log(e);
        setMsg({ text: e.message, variant: "error" });
      });
  }

  function handleChange(e) {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={data.email}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={data.name}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="pwd"
              placeholder="Enter your password"
              onChange={handleChange}
              value={data.pwd}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="cpwd"
              placeholder="Confirm password"
              onChange={handleChange}
              value={data.cpwd}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <NavLink to="/login" className="text-indigo-600 hover:text-indigo-700">
            Login
          </NavLink>
        </p>
        {msg.text && (
          <p
            className={`text-center mt-4 font-semibold ${
              msg.variant === 'error' ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
