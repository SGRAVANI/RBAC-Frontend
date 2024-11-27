import React from 'react'
import { useNavigate } from 'react-router-dom'
function Header() {
  let navigate=useNavigate()
  return (
    <header
  className="text-white text-center py-20 relative bg-cover bg-center"
  style={{
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/userRole.webp')",
    backgroundPosition: "center",
    backgroundSize: "cover",
  }}
>
  
 
  {/* Content container */}
  <div className="flex  flex-col items-center justify-end relative z-10 min-h-[33vh] w-full px-4">
    {/* Text and button card */}
    {/* <div className="bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500  text-white max-w-4xl w-full px-8 py-12 rounded-xl shadow-xl"> */}
      <div className="text-white max-w-4xl w-full px-8  "> 
      
      <h1 className="text-5xl font-bold animate-fade-in-down mb-2">
        Welcome to RBAC App
      </h1>
      <p className="mt-2 text-xl mb-6">
        Securely manage courses, users, and roles with ease.
      </p>
      <button className="mt-3 px-6 py-3 bg-gradient-to-r from-purple-700 via-pink-500 to-yellow-500 text-white font-bold rounded-lg shadow-md  hover:bg-yellow-600 transition-transform transform hover:scale-105" onClick={()=>{navigate("/courses")}}>
        Get Started
      </button>
      </div>
     </div>
  {/*</div> */}
</header>

  )
}

export default Header