
import {useNavigate} from "react-router-dom"

import React from "react";

import CustomSlider from "./CusromSlider";
import Header from "./Header";
import FeatureSection from "./FeatureSection";
export default function Home() {
  let navigate=useNavigate()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      
     <Header/>
      {/* Role-Based Features Section */}
      <FeatureSection/>

{/* <section className="py-16 bg-gray-200"> */}
 <CustomSlider/>
{/* </section> */}

      {/* Call-to-Action Section */}
      <section className="py-16 bg-blue-50 text-black text-center">
        <h2 className="text-3xl font-bold animate-fade-in">Ready to Experience Powerful Access Control?</h2>
        <p className="mt-4 text-xl animate-fade-in">
          Sign in and start managing effortlessly.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105 font-bold" onClick={()=>{navigate("/login")}}>
          Sign In Now
        </button>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; 2024 RBAC App. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="/" className="text-yellow-500 hover:underline">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/" className="text-yellow-500 hover:underline">
            Terms & Conditions
          </a>
        </div>
      </footer>
    </div>
  );
}
