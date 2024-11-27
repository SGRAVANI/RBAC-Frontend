import React, { useState } from "react";
import { Context } from "./Context/ContextData";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
const CourseForm = ({fetchChange,setFetchChange}) => {
  let cont=useContext(Context)
  let navigate=useNavigate()
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
//  const [mentorId, setMentorId] = useState("");
  const [fees, setFees] = useState("");
  const [duration, setDuration] = useState("");
    
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const courseData = {
      title,
      image,
      mentorId:cont.user._id,
      fees,
      duration,
    };
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("mentorId", courseData.mentorId);
    formData.append("fees", courseData.fees);
    formData.append("duration", courseData.duration);
   //console.log(formData)
    if (courseData.image) {
      formData.append("image", courseData.image); // Assuming the image is a file object
    }
    const response = await fetch('http://localhost:8080/course/addCourse', {
        method: 'POST',
        body: formData, // Sending form data (including the file)
        credentials:"include"
      });
  
      if (response.ok) {

        alert('Course created successfully');
        cont.setCourseData((prev)=>{
          return [...prev,{...response.data}]
        })
        setTitle('')
        setDuration('')
        setFees('')
        setImage('')
        navigate('/courses'); // Redirect to blogs page after successful post
        setFetchChange(!fetchChange)
      } else {
        alert('Failed to create blog');
        console.error('Failed to create blog');
      }  
   
  //  console.log(courseData)
   // onSubmit(courseData); // Call the parent onSubmit function
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Course Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter course title"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Course Image</label>
        <input
          type="file"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700">Course Fees</label>
        <input
          type="number"
          value={fees}
          onChange={(e) => setFees(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter course fees"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Duration</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Enter course duration"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Add Course
      </button>
    </form>
  );
};

export default CourseForm;
