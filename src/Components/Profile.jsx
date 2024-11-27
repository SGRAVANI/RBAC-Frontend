

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Context } from './Context/ContextData';
import { useContext } from 'react';

function Profile() {
  let [user, setUser] = useState({});
  let navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  let cont = useContext(Context);
  let [courseData,setCourseData]=useState([])
  let [mentorsCourses,setMentorCourses]=useState([])
  const fetchUserCourses = async () => {
    try {
      const response = await fetch("https://rbac-backend-2wqn.onrender.com/course/getData", {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
          },
          credentials:"include"
      });
  
      if (!response.ok) {
        
        throw new Error("Failed to fetch courses");
      }
  
      const data = await response.json();
      setMentorCourses(data.data); 
    } catch (error) {
      console.error(error);
      setMentorCourses([])
      throw new Error("An error occurred while fetching the courses");
    }
  };
 ///getSubscriptions-admin-profile/:userId
  async function fetchCourses(userId)
  {
    try{
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
}
catch(e)
{
  console.error("error occured while fetching courses")
}
  }
  function getUserData() {
    let id = searchParams.get('id');
    if (!id) {
      fetch("https://rbac-backend-2wqn.onrender.com/user/profile", {
        method: "GET",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((d) => {
          if (d.status === 400) {
            alert(d.message);
            cont.setUser({});
            cont.setIsLogin("false");
            navigate("/login");
          }
          setUser(d.user);
        })
        .catch((e) => {
          navigate("/login");
          console.log("Error occurred while fetching data");
        });
    } else {
      fetch(`https://rbac-backend-2wqn.onrender.com/user/profile/${id}`, {
        method: "GET",
        credentials: "include"
      })
        .then((res) => res.json())
        .then((d) => {
          setUser(d.user);
        })
        .catch((e) => {
          navigate("/login");
          console.log("Error occurred while fetching data");
        });
    }
  }

  useEffect(() => {
    getUserData();
    
  }, []);
  useEffect(()=>{
  fetchCourses()
  if(user.role=="MENTOR")
  {
    fetchUserCourses()
  }
  },[user])

 
  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left section: Profile Picture and basic details */}
          <div className="flex flex-col items-center text-center">
            {/* Profile Image - You can use a default or user's image if available */}
            <div className="w-[80%] h-[80%] rounded-full overflow-hidden mb-6">
              {/* <img src={user.profileImage || 'https://via.placeholder.com/150'} alt="User Avatar" className="w-full h-full object-cover" /> */}
              {cont.user.role=="STUDENT" &&  <img src="../../public/images/student.jpg" alt="User Avatar" className="w-full h-full object-cover" />}
              {cont.user.role=="ADMIN" &&  <img src="../../public/images/admin.png" alt="User Avatar" className="w-[100%] h-[60%] object-contain overflow-hidden" />}
              {cont.user.role=="MENTOR" &&  <img src="../../public/images/teacher.png" alt="User Avatar" className="w-full h-full object-cover "  />}
            </div>
            <h2 className="text-xl font-semibold text-gray-700">{user.name || 'User Name'}</h2>
            <p className="text-gray-500">{user.role || 'Role'}</p>
          </div>

          {/* Right section: User Information */}
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="font-semibold text-gray-700">Name</p>
              <p className="text-gray-600">{user.name|| 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="font-semibold text-gray-700">Email </p>
              <p className="text-gray-600">{user.email || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="font-semibold text-gray-700">Role</p>
              <p className="text-gray-600">{user.role || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              {user.role=="STUDENT" && <><p className="font-semibold text-gray-700">Subscribed Courses</p>
                 {courseData.length==0?<p>No Course Subscribed </p>:
                 <p>
                   {courseData.map((ele,id)=>{
                    return <pre className="text-gray-600" key={`course-${id}`}>{id+1} {ele.title}</pre> 
                   })}
                  
                  </p>} 
                </>}
                {user.role=="MENTOR" && <><p className="font-semibold text-gray-700">Your Courses</p>
                 {mentorsCourses.length==0?<p>No Courses Added Till Now </p>:
                 <p>
                   {mentorsCourses.map((ele,id)=>{
                    return <pre className="text-gray-600" key={`course-${id}`}>{id+1} {ele.title}</pre> 
                   })}
                  
                  </p>} 
                </>}
               


                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
