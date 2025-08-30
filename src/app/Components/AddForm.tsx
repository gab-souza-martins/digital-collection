"use client";
import React from "react";
import Image from "next/image";
import { FaPlus, FaBan, FaFileImage } from "react-icons/fa";

interface AddFormProps {
   onAdd: (title: string, description: string, image?: string) => void;
   closeForm: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAdd, closeForm }) => {
   const [itemName, setItemName] = React.useState<string>("");
   const [itemDescription, setItemDescription] = React.useState<string>("");

   const fileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setItemImageBase64(reader.result as string);
      };
      reader.onerror = (error) => {
         console.log("Error:", error);
      };
   };
   const [itemImageBase64, setItemImageBase64] = React.useState<string>("");
   const [hasSelectedImage, setHasSelectedImage] =
      React.useState<boolean>(false);

   const [error, setError] = React.useState<boolean>(false);

   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (itemName.trim() && itemDescription.trim()) {
         onAdd(itemName, itemDescription, itemImageBase64);
         closeForm();
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
            <form className="flex flex-col gap-3">
               <input
                  onChange={(e) => setItemName(e.target.value)}
                  className="border border-gray-800 rounded-md p-2"
                  type="text"
                  value={itemName}
                  placeholder="Nome do item"
               />

               <div className="border rounded-md p-2 flex flex-col gap-2">
                  <p className="text-semibold text-neutral-500">
                     Imagem (opcional)
                  </p>

                  <div className="flex justify-center items-center self-center">
                     {!hasSelectedImage && (
                        <div className="flex justify-center items-center gap-2 bg-gray-600/80 rounded-md w-50 h-50 self-center">
                           <FaFileImage
                              className="text-white"
                              style={{ fontSize: "2em" }}
                           />
                        </div>
                     )}

                     <input
                        className="absolute opacity-0 w-60 h-50 cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                              fileToBase64(e);
                           }
                           setHasSelectedImage(true);
                        }}
                        name="itemImage"
                        id="imageInput"
                        aria-label="Imagem do item"
                     />
                     {itemImageBase64 && hasSelectedImage && (
                        <Image
                           src={itemImageBase64}
                           alt="Pré-visualização da imagem"
                           className="self-center rounded-md object-cover"
                           width={300}
                           height={300}
                        />
                     )}
                  </div>
               </div>

               <textarea
                  onChange={(e) => setItemDescription(e.target.value)}
                  className="border border-gray-800 rounded-md p-2"
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
