import React, { useEffect,useState } from 'react';
import CourseCard from './CourseCard';
import { Context } from './Context/ContextData';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from './Alert';
const Courses = () => {
  let [errorOb,setErrorOb]=useState({variant:'',msg:''})  
  let [courseData,setCourseData]=useState([]) 
  let cont=useContext(Context)
  let [f,setF]=useState(false)
   let navigate=useNavigate()
   useEffect(()=>{
    if(f)
    {
    setTimeout(()=>{
     setF(false)
     setErrorOb({msg:'',variant:''})
    },2500)
  }
   },[f])
  async function fetchCourses()
{
  try{
    let res=await fetch("https://rbac-backend-2wqn.onrender.com/course/allCourses")
    let data=await res.json()
    if(res.status==200){
      setCourseData(data.courses)
      
    }
    else{
      setCourseData([])
    }
  }
  catch(error)
  {
    alert("Could not fetch courses")
    return
  }
}
useEffect(()=>{
  fetchCourses()
},[])
  
  return (
    <div className="container mx-auto px-4 py-8">
      
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Courses</h2>
      {(cont.isLogin === "true" && cont.user.role=="STUDENT") && (
        <div className='flex justify-end mt-[-60px] mb-10'>
  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={()=>{
   navigate("/subscription")   
  }}>
    My Subscription
  </button>
  </div>
)}
   
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {courseData.map((course, index) => (
          <CourseCard
            key={index}
            image={course.image}
            title={course.title}
            mentor={course.mentorname}
            fees={course.fees}
            duration={course.duration}
            id={course._id}
            errorOb={errorOb}
            setErrorOb={setErrorOb}
            f={f}
            setF={setF}
          />
        ))}
      </div>
     {f&& <Alert variant={errorOb.variant} message={errorOb.msg} />}
    </div>
  );
};

export default Courses;
