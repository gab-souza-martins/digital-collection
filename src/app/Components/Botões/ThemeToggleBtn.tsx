"use client";
import React from "react";

const ThemeToggleBtn = () => {
   const [toggled, setToggled] = React.useState<boolean>(false);

   const handleToggle = () => {
      setToggled(!toggled);
   };

   return (
      <label htmlFor="themeToggle" className="relative inline-block w-16 h-8">
         <span className="hidden">Mudar tema</span>
         <input
            type="checkbox"
            id="themeToggle"
            className="size-0 opacity-0"
            defaultChecked={toggled}
            onClick={handleToggle}
         />
         <span
            className={`cursor-pointer absolute top-0 left-0 bottom-0 right-0 rounded-4xl transition duration-200
                       before:absolute before:size-6 before:top-1 before:left-1 before:bg-white before:rounded-full 
                       before:transition before:duration-300 ${
                          toggled
                             ? "bg-emerald-500 before:translate-x-8"
                             : "bg-gray-500"
                       }`}
         ></span>
      </label>
   );
};

export default ThemeToggleBtn;
