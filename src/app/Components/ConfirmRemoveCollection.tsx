import React from "react";
import { FaTrash } from "react-icons/fa";
import CancelBtn from "./Botões/CancelBtn";

interface ConfirmRemoveCollectionProps {
   confirmRemoveCollection: () => void;
   closeRemoveCollection: () => void;
}

const ConfirmRemoveCollection: React.FC<ConfirmRemoveCollectionProps> = ({
   confirmRemoveCollection,
   closeRemoveCollection,
}) => {
   const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      confirmRemoveCollection();
      closeRemoveCollection();
   };

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div className="bg-white border-1 border-gray-600 p-6 rounded-lg shadow-lg w-70 sm:w-96">
            <p className="text-rose-700">
               Deletar sua coleção é permanente. Todos os itens dentro serão
               perdidos. Deseja prosseguir?
            </p>
            <br />

            <div className="flex gap-2">
               <button
                  onClick={handleConfirm}
                  type="submit"
                  className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 
                            text-white bg-rose-600 border-2 border-rose-600 shadow-sm
                             hover:bg-rose-700 hover:border-rose-700 hover:shadow-xl transition duration-75 ease-in-out
                             active:bg-rose-800 active:border-rose-800 active:shadow-md"
               >
                  <FaTrash />
                  <span className="font-semibold">Confirmar</span>
               </button>

               <CancelBtn onClickEvent={closeRemoveCollection} />
            </div>
         </div>
      </div>
   );
};

export default ConfirmRemoveCollection;
