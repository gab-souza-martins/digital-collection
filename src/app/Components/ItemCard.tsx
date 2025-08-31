import React from "react";
import Image from "next/image";
import { FaStar, FaTrash } from "react-icons/fa";

interface ItemCardProps {
   i: number;
   title: string;
   description: string;
   image?: string;
   isFav: boolean;
   favoriteEvent: (index: number) => void;
   openRemoveConfirm: (index: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
   i,
   title,
   description,
   image,
   isFav,
   favoriteEvent,
   openRemoveConfirm,
}) => {
   const handleFavorite = () => {
      favoriteEvent(i);
   };

   const handleRemoveConfirm = () => {
      openRemoveConfirm(i);
   };

   const date: Date = new Date();

   return (
      <div className="w-2xs border rounded-lg p-4 shadow-md">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{title}</h2>

            <button
               onClick={handleFavorite}
               className="cursor-pointer"
               aria-label="Marcar como favorito"
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
               className="rounded-md object-cover"
               width={300}
               height={300}
            />
         )}

         <hr className="opacity-40" />

         <p>{description}</p>

         <p className="text-sm text-gray-500 mt-2">
            Adicionado em {date.toLocaleDateString("pt-BR")}
         </p>

         <button aria-label="Remover item" onClick={handleRemoveConfirm}>
            <FaTrash className="text-gray-600 cursor-pointer hover:text-rose-600 transition duration-75 ease-in-out" />
         </button>
      </div>
   );
};

export default ItemCard;
