"use client";
import React from "react";
import { FaPlusCircle } from "react-icons/fa";

interface BtnFormProps {
   onAdd: (title: string) => void;
}

const BtnForm: React.FC<BtnFormProps> = ({ onAdd }) => {
   const [itemName, setItemName] = React.useState("");

   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (itemName.trim()) {
         onAdd(itemName);
         setItemName("");
      }
   };

   return (
      <div>
         <form className="flex items-center flex-wrap gap-2">
            <input
               className="border border-gray-800 rounded-md"
               type="text"
               value={itemName}
               onChange={(e) => setItemName(e.target.value)}
            />

            <button
               onClick={handleSubmit}
               type="submit"
               className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-white bg-emerald-600 shadow-sm
             hover:bg-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
             active:bg-emerald-800 active:shadow-md"
            >
               <FaPlusCircle />
               <span className="font-semibold">Adicionar item</span>
            </button>
         </form>
      </div>
   );
};

export default BtnForm;
