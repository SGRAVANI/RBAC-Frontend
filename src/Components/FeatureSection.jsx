import React from 'react'
import { GrUserAdmin } from "react-icons/gr";
import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import RoleFeatureCard from './RoleFeatureCard';
function FeatureSection() {
  return (
    <section className="py-16 px-8 bg-white">
    <h2 className="text-4xl font-bold text-center mb-10 animate-fade-in-up">
      Features by Role
    </h2>
    <div className="mt-8 grid   sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* Student Features */}
      
     <RoleFeatureCard Component={PiStudentFill} color="text-blue-600"  role="Student" h1="View available courses" h2="Subscribe to courses"/>
      {/* Mentor Features */}
      <RoleFeatureCard Component={GiTeacher} color="text-green-600"  role="Mentor" h1="Add new courses" h2="Delete existing courses"/>
         {/* Admin Features */}
         <RoleFeatureCard Component={GrUserAdmin} color="text-red-600"  role="Admin" h1="Update user roles" h2="Delete users" h3="Change user status"/>
      
    </div>
  </section>

  )
}

export default FeatureSection