"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";

interface OpenFormBtnProps {
   openForm: () => void;
}

const OpenFormBtn: React.FC<OpenFormBtnProps> = ({ openForm }) => {
   const handleOpen = () => {
      openForm();
   };

   return (
      <button
         onClick={handleOpen}
         type="submit"
         className="cursor-pointer rounded-full text-center p-4 fixed bottom-5 right-5
                       text-xl xs:text-2xl sm:text-3xl
                      text-white bg-emerald-600 shadow-sm
                      hover:bg-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
                      active:bg-emerald-800 active:shadow-md
                      focus:outline-3 focus:outline-emerald-600 focus:outline-offset-4"
         aria-label="Adicionar"
      >
         <FaPlus />
      </button>
   );
};

export default OpenFormBtn;
