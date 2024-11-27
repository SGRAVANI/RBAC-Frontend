import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from './Context/ContextData'
import { useContext } from 'react'
function Protected({Component}) {
    let navigate=useNavigate()
    let cont=useContext(Context)
    useEffect(()=>{
        if(cont.isLogin=='false')
        {  console.log("reached")
         navigate("/login")
        }
    },[])
    
  return (
    <>
   <Component/>
    </>
  )
}

export default Protected