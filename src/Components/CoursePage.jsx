

import React, { useState, useEffect } from "react";
import { fetchUserCourses } from "./api/courseApi"; // Fetch API function
import CourseForm from "./CourseForm.jsx"; // Import the CourseForm component
import { Context } from "./Context/ContextData.jsx";
import { useContext } from "react";

const CoursePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cont = useContext(Context);
 const [fetchChange,setFetchChnage]=useState(false)
  // Fetch the courses from the server (assuming the user is authenticated)
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetchUserCourses();
        setCourses(response.data);
      //  setFetchChnage(!fetchChange)
        cont.setCourseData((prev) => {
          return [...response.data];
        });
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [fetchChange]);

  async function handleDelete(courseId)
  {
    try{
     let res=await fetch(`http://localhost:8080/course/deleteCourse/${courseId}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
      },
      credentials:"include"
     })
     let data=await res.json()
     if(data.status==200)
     {
      alert(data.message)
      let courses=cont.courseData;
      let r=[]
      for(let ele of courses)
      {
        if(ele._id!=courseId)
        {
          r.push(ele)
        }
      }
      cont.setCourseData([...r])
      setFetchChnage(!fetchChange)
     }
     else{
      alert("Error occured in deletion")
     }
    } 
    catch(error)
    {
      console.error(error.message)
      alert("Can not Deleted")
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-wrap lg:flex-nowrap">
        {/* Left Section: Display All Courses */}
        <div className="w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-lg space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Courses</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500">No courses available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {cont.courseData.map((course) => (
                <div
                  key={course._id}
                  className="p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={course.image || "/placeholder-image.png"} // Fallback for missing images
                    alt={course.title}
                    className="w-full h-32 rounded-lg object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600">Fees: ₹{course.fees}</p>
                  <p className="text-sm text-gray-600">Duration: {course.duration} weeks</p>
                  <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this course?")) {
                        // Add deleteCourse logic here
                        handleDelete(course._id)
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Add New Course */}
        <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Course</h2>
          <CourseForm fetchChange={fetchChange} setFetchChange={setFetchChnage}/>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
