import { Context } from "./ContextData";
import React, { useEffect } from 'react'

import { useState } from "react";
function StateContext(props) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || {};
});
const [isLogin, setIsLogin] = useState(() => {
  return localStorage.getItem("isLogin") === "true"?"true":"false";
});
    const [courseData,setCourseData]=useState([])
    useEffect(()=>{
        
     localStorage.setItem("isLogin",isLogin)
    },[isLogin])
    useEffect(()=>{
     localStorage.setItem("user",JSON.stringify(user))
    // console.log(user)
    },[user])
  return (
    <Context.Provider value={{user,setUser,isLogin,setIsLogin,courseData,setCourseData}}>
    {props.children}
</Context.Provider>
  )
}

export default StateContext