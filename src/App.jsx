import { useState } from 'react'
import "./App.css"
import Home from './Components/Home'
import { Routes,Route } from 'react-router-dom'
import StateContext from './Components/Context/StateContext'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import Profile from './Components/Profile'
import ManageUsers from './Components/ManageUsers'
import ErrorPage from './Components/ErrorPage'
import Protected from './Components/Protected'
import CoursePage from './Components/CoursePage'
import CourseForm from './Components/CourseForm'
import HomeLogin from './Components/HomeLogin'
import HomeRegister from './Components/HomeRegister'
import Courses from './Components/Courses'
import MySubscription from './Components/MySubscription'
function App() {
 

  return (
     
      <div>
       <StateContext>
        <Navbar/>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<Protected Component={Profile}/> } />
        <Route path="/manageusers" element={<Protected Component={ManageUsers}/>} />
        <Route path="/mentor-courses" element={<Protected Component={CoursePage}/>} />
        <Route path="/courses" element={<Courses/>} />
        <Route path="/courses-add" element={<Protected Component={CourseForm}/>} />
        
        <Route path="/subscription" element={<Protected Component={MySubscription}/>} />
        <Route path="/home-login" element={<HomeLogin/>} />
        <Route path="/home-register" element={<HomeRegister/>} />
        
        
        <Route path="*" element={<ErrorPage/>} />
       </Routes>
       </StateContext>
    </div>
  )
}

export default App
