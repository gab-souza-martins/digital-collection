"use client";
import React from "react";

const ThemeToggleBtn = () => {
   const [toggled, setToggled] = React.useState<boolean>(false);

   const handleToggle = () => {
      setToggled(!toggled);
   };

   return (
      <label htmlFor="themeToggle">
         Tema
         <input
            type="checkbox"
            id="themeToggle"
            defaultChecked={toggled}
            onClick={handleToggle}
         />
      </label>
   );
};

export default ThemeToggleBtn;
