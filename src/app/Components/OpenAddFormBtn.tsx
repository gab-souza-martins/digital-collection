"use client";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

interface OpenAddFormBtnProps {
   onAdd: (title: string) => void;
}

const OpenAddFormBtn = () => {
   return (
      <div>
         <button
            // onClick={handleSubmit}
            type="submit"
            className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-white bg-emerald-600 shadow-sm
             hover:bg-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
             active:bg-emerald-800 active:shadow-md"
         >
            <FaPlusCircle />
            <span className="font-semibold">Adicionar item</span>
         </button>
      </div>
   );
};

export default OpenAddFormBtn;
