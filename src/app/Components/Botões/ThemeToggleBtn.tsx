"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleBtn = () => {
   const [toggled, setToggled] = React.useState<boolean>(false);

   const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      setToggled(!toggled);
      if (e.target.checked) {
         document.querySelector("body")?.setAttribute("data-theme", "dark");
      } else {
         document.querySelector("body")?.setAttribute("data-theme", "light");
      }
   };

   return (
      <label
         htmlFor="themeToggle"
         className={`relative cursor-pointer inline-block w-16 h-8 rounded-4xl transition duration-300 ease-in-out ${
            toggled ? "bg-gray-800" : "bg-gray-500"
         }`}
      >
         <span className="hidden">Mudar tema</span>
         <input
            type="checkbox"
            id="themeToggle"
            className="size-0 opacity-0"
            defaultChecked={toggled}
            onChange={handleToggle}
         />
         <div
            className={`cursor-pointer absolute flex items-center justify-center top-1 left-1 size-6 rounded-full 
                transition duration-300 ease-in-out text-gray-700 ${
                   toggled ? "translate-x-8 bg-gray-600 text-white" : "bg-white"
                }`}
         >
            {toggled ? <FaMoon /> : <FaSun className="-ml-0.45" />}
         </div>
      </label>
   );
};

export default ThemeToggleBtn;
