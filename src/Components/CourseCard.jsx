
import React, { useState, useContext } from 'react';
import { Context } from './Context/ContextData';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ image, title, mentor, fees, duration, id ,subscribed,setIsUpdated,isUpdated,errorOb,setErrorOb,f,setF}) => {
  const [flashMessage, setFlashMessage] = useState(''); // State for the flash message
  const [flashType, setFlashType] = useState('info'); // Type of message ('info', 'success', 'error')
  const cont = useContext(Context); // Assume `cont.isLogin` holds user login status
  const navigate = useNavigate();
  const handleRemoveSubscription=async () => {
    setFlashMessage('');
    
      // subscription remove  logic
      try {
        const res = await fetch(`https://rbac-backend-2wqn.onrender.com/user/remove-subscription/${id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        if (res.status === 200||res.status===201) {
         // setFlashMessage(data.message);
          //setFlashType('success');
          setIsUpdated(!isUpdated)
          setF(true)
          setErrorOb({variant:"success",msg:data.message})
        } else {
          //setFlashMessage(data.message);
          //setFlashType('error');
          setF(true)
          setErrorOb({variant:"error",msg:data.message})
        }
      } catch (error) {
        //setFlashMessage('An error occurred. Please try again later.');
       // setFlashType('error');
       setF(true) 
       setErrorOb({variant:"error",msg:'An error occurred. Please try again later.'})
      }

      // Clear flash message after 3 seconds
     // setTimeout(() => {
        //setFlashMessage('');
      //}, 3000);
    
  };
  const handleSubscribe = async () => {
    setFlashMessage('');
    if (cont.isLogin === "false") {
      // Show flash message if the user is not logged in
      //setFlashMessage('Please log in to subscribe!');
      //setFlashType('error');
      setErrorOb({variant:"error",msg:'Please log in to subscribe!'})
      setF(true)
      setTimeout(() => {
        setFlashMessage('');
        
        navigate("/login");
      }, 2500); // Clear message and navigate after 2.5 seconds
    } else {
      // Perform subscription logic
      try {
        const res = await fetch(`https://rbac-backend-2wqn.onrender.com/user/subscribe/${id}`, {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();

        if (res.status === 200) {
        //  setFlashMessage(data.message);
          //setFlashType('success');
          setF(true)
          setErrorOb({variant:"success",msg:data.message})
         // setIsUpdated(!setIsUpdated)
        } else {
          setF(true)
          //setFlashMessage(data.message);
          //setFlashType('error');
          setErrorOb({variant:"error",msg:data.message})
        }
      } catch (error) {
        //setFlashMessage('An error occurred. Please try again later.');
        setF(true)
        //setFlashType('error');
        setErrorOb({variant:"error",msg:"An error occurred. Please try again later."})
      }

      // Clear flash message after 3 seconds
      // setTimeout(() => {
      //   setFlashMessage('');
      // }, 3000);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={image} alt={title} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">Mentor: {mentor}</p>
        <p className="text-sm text-gray-600">Fees: {fees}</p>
        <p className="text-sm text-gray-600">Duration: {duration}</p>
        {!subscribed&&<button
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
         }
        {subscribed &&<button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-blue-600 transition"
          onClick={handleRemoveSubscription}
        >
          Unsubscribe
        </button>}
        {flashMessage && (
          <div
            className={`mt-4 p-2 rounded text-center ${
              flashType === 'success'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {flashMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
