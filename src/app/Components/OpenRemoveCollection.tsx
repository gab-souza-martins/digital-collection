"use client";
import React from "react";
import { FaDumpsterFire } from "react-icons/fa";

interface OpenRemoveCollectionProps {
   openRemoveCollection: () => void;
}

const OpenRemoveCollection: React.FC<OpenRemoveCollectionProps> = ({
   openRemoveCollection,
}) => {
   const handleOpen = () => {
      openRemoveCollection();
   };

   return (
      <div>
         <button
            onClick={handleOpen}
            type="submit"
            className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-rose-600 border-2 border-rose-600 shadow-sm
                     hover:bg-rose-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                     active:bg-rose-700 active:border-rose-700 active:shadow-md"
         >
            <FaDumpsterFire />
            <span className="font-semibold">Remover coleção</span>
         </button>
      </div>
   );
};

export default OpenRemoveCollection;
