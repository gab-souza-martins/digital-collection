"use client";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggleBtn = () => {
   const [theme, setTheme] = React.useState<string>("light");

   React.useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      const parsed = savedTheme ? JSON.parse(savedTheme) : "light";

      if (parsed) {
         document.querySelector("body")?.setAttribute("data-theme", parsed);
      }
   }, []);

   const handleThemeChange = (t: string) => {
      setTheme(t);
      document.querySelector("body")?.setAttribute("data-theme", t);
      localStorage.setItem("theme", JSON.stringify(t));
   };

   const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
         handleThemeChange("dark");
      } else {
         handleThemeChange("light");
      }
   };

   return (
      <label
         htmlFor="themeToggle"
         className="relative cursor-pointer inline-block w-16 h-8 rounded-4xl transition duration-300 ease-in-out"
         style={{ backgroundColor: "var(--light-foreground)" }}
      >
         <span className="hidden">Mudar tema</span>
         <input
            type="checkbox"
            id="themeToggle"
            className="size-0 opacity-0"
            defaultChecked={theme === "dark"}
            onChange={handleToggle}
         />
         <div
            className={`cursor-pointer absolute flex items-center justify-center top-1 left-1 size-6 rounded-full 
                transition duration-300 ease-in-out text-gray-700 ${
                   theme === "dark"
                      ? "translate-x-8 bg-gray-600 text-white"
                      : "bg-white"
                }`}
         >
            {theme === "dark" ? <FaMoon /> : <FaSun className="-ml-0.45" />}
         </div>
      </label>
   );
};

export default ThemeToggleBtn;
