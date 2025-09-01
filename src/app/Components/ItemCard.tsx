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
      <div className="w-2xs min-h-[100%] border rounded-lg p-4 shadow-md">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold break-all">{title}</h2>

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
               className="rounded-md object-cover mb-3"
               width={300}
               height={300}
            />
         )}

         <hr className="opacity-40 my-2" />

         <p className="min-h-12 mb-4 break-all">{description}</p>

         <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-2">{dateAdded}</p>

            <button aria-label="Remover item" onClick={handleRemoveConfirm}>
               <FaTrash className="text-gray-600 cursor-pointer hover:text-rose-600 transition duration-75 ease-in-out" />
            </button>
         </div>
      </div>
   );
};

export default ItemCard;
