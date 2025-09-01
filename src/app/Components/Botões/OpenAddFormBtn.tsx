"use client";
import React from "react";
import { FaPlus } from "react-icons/fa";

interface OpenAddFormBtnProps {
   openForm: () => void;
}

const OpenAddFormBtn: React.FC<OpenAddFormBtnProps> = ({ openForm }) => {
   const handleOpen = () => {
      openForm();
   };

   return (
      <div>
         <button
            onClick={handleOpen}
            type="submit"
            className="cursor-pointer rounded-full text-center p-4 fixed bottom-5 right-5
                       text-xl xs:text-2xl sm:text-3xl
                      text-white bg-emerald-600 shadow-sm
                      hover:bg-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
                      active:bg-emerald-800 active:shadow-md"
            aria-label="Adicionar"
         >
            <FaPlus />
         </button>
      </div>
   );
};

export default OpenAddFormBtn;
