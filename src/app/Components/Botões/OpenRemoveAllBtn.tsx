"use client";
import React from "react";
import { FaDumpsterFire } from "react-icons/fa";

interface OpenRemoveAllBtnProps {
   openRemoveAll: () => void;
}

const OpenRemoveAllBtn: React.FC<OpenRemoveAllBtnProps> = ({
   openRemoveAll,
}) => {
   const handleOpen = () => {
      openRemoveAll();
   };

   return (
      <div className="flex justify-center mt-10">
         <button
            onClick={handleOpen}
            type="submit"
            className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 border-2 border-rose-600
                     shadow-sm rose-text hover:bg-rose-600 hover:shadow-xl transition duration-75 ease-in-out
                     active:bg-rose-700 active:border-rose-700 active:shadow-md"
         >
            <FaDumpsterFire />
            <span className="font-semibold">Remover todos</span>
         </button>
      </div>
   );
};

export default OpenRemoveAllBtn;
