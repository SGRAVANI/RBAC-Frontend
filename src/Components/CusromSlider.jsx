import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaBuildingLock } from "react-icons/fa6";
import { BsSpeedometer } from "react-icons/bs";
import { TbPasswordUser } from "react-icons/tb";

import { useRef } from "react";

export default function CustomSlider() {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -360, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 360, behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <h2 className="text-4xl font-extrabold text-center mb-10">
        Explore Our Features
      </h2>
      <div className="slider-wrapper relative max-w-min mx-auto">
        {/* Previous Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 shadow-lg rounded-full p-3 hover:bg-blue-500 hover:text-white transition-all duration-300 z-10"
          aria-label="Previous Slide"
        >
          <FaChevronLeft className="text-xl" />
        </button>

        {/* Slider Content */}
        <div
          ref={sliderRef}
          className="slider flex space-x-6 overflow-x-auto no-scrollbar px-6"
        >
          {/* Slide 1 */}
          <div className="slider-card bg-white text-black rounded-xl shadow-lg p-6 flex-shrink-0 w-80 transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <BsSpeedometer className="text-purple-600 text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-center mt-4">
              Intuitive Dashboard
            </h3>
            <p className="mt-2 text-gray-700 text-center">
              Manage users and courses effortlessly with a streamlined
              interface.
            </p>
          </div>

          {/* Slide 2 */}
          <div className="slider-card bg-white text-black rounded-xl shadow-lg p-6 flex-shrink-0 w-80 transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <TbPasswordUser className="text-green-600 text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-center mt-4">
              Role-Based Access
            </h3>
            <p className="mt-2 text-gray-700 text-center">
              Ensure security and clarity by restricting features by role.
            </p>
          </div>

          {/* Slide 3 */}
          <div className="slider-card bg-white text-black rounded-xl shadow-lg p-6 flex-shrink-0 w-80 transition-transform transform hover:scale-105">
            <div className="flex justify-center">
              <FaBuildingLock className="text-blue-600 text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-center mt-4">
              Secure Authentication
            </h3>
            <p className="mt-2 text-gray-700 text-center">
              Authenticate users with JWT tokens for secure access.
            </p>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={scrollRight}
          className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-white text-blue-500 shadow-lg rounded-full p-3 hover:bg-blue-500 hover:text-white transition-all duration-300 z-10"
          aria-label="Next Slide"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    </section>
  );
}
