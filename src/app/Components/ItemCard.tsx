import React from "react";
import Image from "next/image";
import { FaStar, FaTrash } from "react-icons/fa";

interface ItemCardProps {
   id: string;
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
   favoriteEvent: (index: string) => void;
   openRemoveConfirm: (index: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
   id,
   title,
   description,
   dateAdded,
   image,
   isFav,
   favoriteEvent,
   openRemoveConfirm,
}) => {
   const handleFavorite = () => {
      favoriteEvent(id);
   };

   const handleRemoveConfirm = () => {
      openRemoveConfirm(id);
   };

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

         <p className="text-sm text-gray-500 mt-2">{dateAdded}</p>

         <button aria-label="Remover item" onClick={handleRemoveConfirm}>
            <FaTrash className="text-gray-600 cursor-pointer hover:text-rose-600 transition duration-75 ease-in-out" />
         </button>
      </div>
   );
};

export default ItemCard;
