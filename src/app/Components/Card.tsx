import React from "react";
import Image from "next/image";
import Tag from "../Types/TagType";
import TagComponent from "./TagComponent";
import { FaStar, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

interface CardProps {
   id: string;
   type: "coleção" | "item";
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
   tags: Tag[];
   favoriteEvent: (index: string) => void;
   openRemoveConfirm: (index: string) => void;
   openEditForm: (index: string) => void;
   filterTags: (itemId: string, tagId: string) => void;
}

const Card: React.FC<CardProps> = ({
   id,
   type,
   title,
   description,
   dateAdded,
   image,
   isFav,
   tags,
   favoriteEvent,
   openRemoveConfirm,
   openEditForm,
   filterTags,
}) => {
   const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      favoriteEvent(id);
   };

   const handleRemoveConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openRemoveConfirm(id);
   };

   const handleOpenEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openEditForm(id);
   };

   const handleFilterTags = (tagId: string) => {
      filterTags(id, tagId);
   };

   return (
      <div className="flex flex-col w-2xs min-h-[100%] justify-start border rounded-lg p-4 shadow-md">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold break-all">{title}</h2>

            <label htmlFor="marcarFav" className="hidden">
               Marcar como favorito
            </label>
            <button
               onClick={handleFavorite}
               aria-label="Marcar como favorito"
               id="marcarFav"
               className="cursor-pointer"
            >
               <FaStar
                  className={isFav ? "text-yellow-400" : "text-gray-300"}
               />
            </button>
         </div>

         {image && (
            <Image
               src={image}
               alt={title}
               className="rounded-md object-cover mb-3"
               width={300}
               height={300}
            />
         )}

         <hr className="my-2 text-gray-400" />

         <p className="min-h-12 mb-4 break-all whitespace-pre-wrap">
            {description}
         </p>

         <div className="mt-auto">
            <div className="mb-2 flex items-center flex-wrap gap-2">
               {(tags ?? []).map((t) => (
                  <TagComponent
                     key={t.id}
                     id={t.id}
                     name={t.name}
                     bgColor={t.bgColor}
                     textColor={t.textColor}
                     removeTag={() => handleFilterTags(t.id)}
                  />
               ))}
            </div>

            <p className="text-sm text-gray-500 mb-2">{dateAdded}</p>

            <div className="text-lg text-gray-600 flex items-center gap-4">
               <label htmlFor="editar" className="hidden">
                  Editar {type}
               </label>
               <button
                  onClick={handleOpenEdit}
                  aria-label="Botão de editar"
                  id="editar"
               >
                  <FaPenToSquare className="cursor-pointer hover:text-emerald-600 active:text-emerald-700 transition duration-75 ease-in-out" />
               </button>

               <label htmlFor="remover" className="hidden">
                  Remover {type}
               </label>
               <button
                  onClick={handleRemoveConfirm}
                  aria-label="Botão de remover"
                  id="remover"
               >
                  <FaTrash className="cursor-pointer hover:text-rose-600 active:text-rose-700 transition duration-75 ease-in-out" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default Card;
