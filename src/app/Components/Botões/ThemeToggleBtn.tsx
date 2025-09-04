"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleBtn = () => {
   const [toggled, setToggled] = React.useState<boolean>(false);

   const handleToggle = () => {
      setToggled(!toggled);
   };

   return (
      <label
         htmlFor="themeToggle"
         className={`relative cursor-pointer inline-block w-16 h-8 rounded-4xl transition duration-200 ease-in-out ${
            toggled ? "bg-gray-800" : "bg-gray-500"
         }`}
      >
         <span className="hidden">Mudar tema</span>
         <input
            type="checkbox"
            id="themeToggle"
            className="size-0 opacity-0"
            defaultChecked={toggled}
            onClick={handleToggle}
         />
         <div
            className={`cursor-pointer absolute flex items-center justify-center top-1 left-1 size-6 rounded-full 
                transition duration-300 ease-in-out ${
                   toggled ? "translate-x-8 bg-gray-600 text-white" : "bg-white"
                }`}
         >
            {toggled ? (
               <FaMoon />
            ) : (
               <FaSun className="-ml-0.45 text-gray-700" />
            )}
         </div>
      </label>
   );
};

export default ThemeToggleBtn;
