import React from 'react'

function RoleFeatureCard({color,Component,role,h1,h2,h3}) {
  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
    <div className="flex flex-col items-center">
  {/* <PiStudentFill className="text-blue-600 text-6xl"/> */}
  <Component className={`${color} text-6xl`}/>
    {/* <Icon className="text-blue-600 text-6xl">school</Icon> */}
    <h3 className={`text-2xl font-semibold ${color} mt-4`}>
      {role}
    </h3>
   
    <ul className="mt-4 list-disc list-inside">
      <li>{h1}</li>
      <li>{h2}</li>
      {h3&&<li>{h3}</li>}
    </ul>
  </div>
  </div>

  )
}

export default RoleFeatureCard