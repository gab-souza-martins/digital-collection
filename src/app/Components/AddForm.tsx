"use client";
import React from "react";
import { FaPlus, FaBan } from "react-icons/fa";

interface AddFormProps {
   onAdd: (title: string, description: string) => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAdd }) => {
   const [itemName, setItemName] = React.useState("");
   const [itemDescription, setItemDescription] = React.useState("");

   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (itemName.trim() && itemDescription.trim()) {
         onAdd(itemName, itemDescription);
         setItemName("");
         setItemDescription("");
      }
   };

   const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setItemName("");
      setItemDescription("");
   };

   return (
      <div>
         <form className="flex flex-col gap-2">
            <input
               onChange={(e) => setItemName(e.target.value)}
               className="border border-gray-800 rounded-md"
               type="text"
               value={itemName}
               placeholder="Nome do item"
            />

            <textarea
               onChange={(e) => setItemDescription(e.target.value)}
               className="border border-gray-800 rounded-md"
               value={itemDescription}
               placeholder="Descrição do item"
            />

            <div className="flex items-center gap-2">
               <button
                  onClick={handleSubmit}
                  type="submit"
                  className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-white bg-emerald-600 border-2 border-emerald-600
                            shadow-sm hover:bg-emerald-700 hover:border-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
                             active:bg-emerald-800 active:border-emerald-800 active:shadow-md"
               >
                  <FaPlus />
                  <span className="font-semibold">Adicionar</span>
               </button>

               <button
                  onClick={handleReset}
                  type="submit"
                  className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-rose-600 border-2 border-rose-600 shadow-sm
                             hover:bg-rose-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                             active:bg-rose-700 active:border-rose-700 active:shadow-md"
               >
                  <FaBan />
                  <span className="font-semibold">Cancelar</span>
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddForm;
