"use client";
import React from "react";
import { FaPlus, FaBan } from "react-icons/fa";

interface AddFormProps {
   onAdd: (title: string, description: string) => void;
   closeForm: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAdd, closeForm }) => {
   const [itemName, setItemName] = React.useState("");
   const [itemDescription, setItemDescription] = React.useState("");
   const [error, setError] = React.useState(false);

   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (itemName.trim() && itemDescription.trim()) {
         onAdd(itemName, itemDescription);
         setItemName("");
         setItemDescription("");
         setError(false);
      } else {
         setError(true);
         return;
      }
   };

   const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      closeForm();
   };

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div className="bg-white border-1 border-gray-600 p-6 rounded-lg shadow-lg w-70 sm:w-96">
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

               {error && (
                  <p className="text-sm text-rose-700">
                     Preencha todos os campos obrigatórios.
                  </p>
               )}

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
                     onClick={handleCancel}
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
      </div>
   );
};

export default AddForm;
