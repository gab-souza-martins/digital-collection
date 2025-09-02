"use client";
import React from "react";
import Image from "next/image";
import { FaPlus, FaFileImage, FaTag } from "react-icons/fa";
import CancelBtn from "./Botões/CancelBtn";
import Tag from "../Types/TagType";
import { v4 as uuidv4 } from "uuid";
import TagComponent from "./TagComponent";

interface AddFormProps {
   onAdd: (
      title: string,
      description: string,
      tags: Tag[],
      image?: string
   ) => void;
   closeForm: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onAdd, closeForm }) => {
   // *Handlers de nome e descrição
   const [name, setName] = React.useState<string>("");
   const [description, setDescription] = React.useState<string>("");

   // *Handlers e funções das tags
   const [tagInput, setTagInput] = React.useState<string>("");
   const [itemTags, setItemTags] = React.useState<Tag[]>([]);
   const [tagColor, setTagColor] = React.useState<string>("");

   const addTag = (
      e:
         | React.MouseEvent<HTMLButtonElement>
         | React.KeyboardEvent<HTMLInputElement>
   ) => {
      e.preventDefault();

      if (!tagInput.trim()) {
         return;
      } else {
         setItemTags((prev) => [
            ...prev,
            { id: uuidv4(), name: tagInput.trim(), color: tagColor },
         ]);
         setTagInput("");
      }
   };

   const filterTag = (index: string) => {
      const newTags = itemTags.filter((t) => t.id !== index);
      setItemTags(newTags);
   };

   // *Converter imagem para base64 e mostrá-la no form
   const fileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setImageBase64(reader.result as string);
      };
      reader.onerror = (error) => {
         console.log("Error:", error);
      };
   };
   const [imageBase64, setImageBase64] = React.useState<string>("");
   const [hasSelectedImage, setHasSelectedImage] =
      React.useState<boolean>(false);

   // *Handler de erro
   const [error, setError] = React.useState<boolean>(false);

   // *Handler de submit
   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (name.trim() && description.trim()) {
         onAdd(name, description, itemTags, imageBase64);
         closeForm();
      } else {
         setError(true);
         return;
      }
   };

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div className="bg-white border-1 border-gray-600 p-6 rounded-lg shadow-lg w-70 sm:w-96">
            <form className="flex flex-col gap-3">
               <input
                  onChange={(e) => setName(e.target.value)}
                  className="border border-gray-800 rounded-md p-2"
                  type="text"
                  value={name}
                  placeholder="Nome"
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
                     {imageBase64 && hasSelectedImage && (
                        <Image
                           src={imageBase64}
                           alt="Pré-visualização da imagem"
                           className="self-center rounded-md object-cover"
                           width={300}
                           height={300}
                        />
                     )}
                  </div>
               </div>

               <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-800 rounded-md p-2"
                  value={description}
                  placeholder="Descrição"
               />

               <div className="flex items-center justify-between gap-2 w-1/1">
                  <input
                     onChange={(e) => setTagInput(e.target.value)}
                     onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag(e))
                     }
                     type="text"
                     className="border border-gray-800 rounded-md p-2 min-w-7/10"
                     value={tagInput}
                     placeholder="Etiquetas (opcional)"
                  />

                  <input
                     onChange={(e) => setTagColor(e.target.value)}
                     value={tagColor}
                     aria-label="Escolher cor da etiqueta"
                     className="w-full"
                     type="color"
                  />

                  <button
                     onClick={addTag}
                     aria-label="Adicionar etiqueta."
                     className="cursor-pointer p-3 rounded-md bg-emerald-600 text-white
                                hover:bg-emerald-700 active:bg-emerald-800 transition duration-75 ease-in-out"
                  >
                     <FaTag />
                  </button>
               </div>

               <div className="flex items-center flex-wrap gap-2">
                  {itemTags.map((t) => (
                     <TagComponent
                        key={t.id}
                        id={t.id}
                        name={t.name}
                        color={t.color}
                        removeTag={filterTag}
                     />
                  ))}
               </div>

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

                  <CancelBtn onClickEvent={closeForm} />
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddForm;
