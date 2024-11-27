// courseApi.js
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
      return data; // Return the fetched data, assuming it's in the format { data: courses }
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching the courses");
    }
  };
  
   const createCourse = async (courseData) => {
    try {
        console.log(courseData)
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("mentorId", courseData.mentorId);
      formData.append("fees", courseData.fees);
      formData.append("duration", courseData.duration);
     //console.log(formData)
      if (courseData.image) {
        formData.append("image", courseData.image); // Assuming the image is a file object
      }
       
      const response = await fetch("https://rbac-backend-2wqn.onrender.com/course/addCourse", {
        method:"POST",
        body: formData,
        headers: {
          "Content-Type":"application/json"
        },
        credentials:"include"
      });
       
      const data = await response.json();
    console.log(data)
      if (!response.ok) {
        console.log(response.status)
        throw new Error("Failed to create course");
      }
      return data; // Return the created course or a success message
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while creating the course");
    }
  };
  export {fetchUserCourses,createCourse}