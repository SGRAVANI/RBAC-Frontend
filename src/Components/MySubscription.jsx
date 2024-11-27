import React, { useEffect,useState } from 'react';
import CourseCard from './CourseCard';
import { Context } from './Context/ContextData';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const MySubscription = () => {
  
  let [courseData,setCourseData]=useState([]) 
  let cont=useContext(Context)
  let navigate=useNavigate()
  let [isLoading,setIsLoading]=useState(false)
  let [isUpdated,setIsUpdated]=useState(false)
  async function fetchCourses()
{
  try{
    setIsLoading(true)
    let res=await fetch("https://rbac-backend-2wqn.onrender.com/user/getSubscriptions",{
        method:"GET",
        credentials:"include",
        headers:{
            "Content-Types":"application/json"
        }
    })
    let data=await res.json()
    if(res.status==200){
      setCourseData(data.courses)
      
    }
    else{
      setCourseData([])
    }
    setIsLoading(false)
  }
  catch(error)
  {
    alert("Could not fetch courses")
    return
  }
}
useEffect(()=>{
  fetchCourses()
},[isUpdated])
  
  return courseData.length==0?<>
  <div className="container mx-auto px-4 py-8">
  <h2 className="text-3xl font-bold text-center text-red-800 mb-8">You Haven't Subscribed Any Course Yet !!! Click on Below Button to visited availabe courses </h2>
  <div className='flex justify-center'>  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mx-auto " onClick={()=>{
   navigate("/courses")   
  }}>
    Explore Courses
  </button> 
  </div>

  </div>
  </>:
   isLoading? <p> Data is Loading...</p>:(<div className="container mx-auto px-4 py-8">
      
      


      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Subscribed Courses</h2>
       

      {(cont.isLogin === "true") && (
        <div className='flex justify-end mt-[-60px] mb-10'>
  <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={()=>{
   navigate("/courses")   
  }}>
    Explore More Courses
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
            subscribed={true}
            isUpdated={isUpdated}
            setIsUpdated={setIsUpdated}
          />
        ))}
      </div>
    </div>
  );
};

export default MySubscription;
