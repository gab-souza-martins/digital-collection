import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

interface CollectionCardProps {
   id: string;
   title: string;
   description: string;
   dateCreated: string;
   image?: string;
   openRemoveConfirm: (id: string) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
   id,
   title,
   description,
   dateCreated,
   image,
   openRemoveConfirm,
}) => {
   const handleRemoveConfirm = () => {
      openRemoveConfirm(id);
   };

   return (
      <div className="w-2xs min-h-[100%] flex flex-col justify-start border rounded-lg p-4 shadow-md">
         <h2 className="text-2xl font-semibold">{title}</h2>

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

         <p className="min-h-12 mb-4">{description}</p>

         <div className="mt-auto">
            <p className="text-sm text-gray-500 mb-2">{dateCreated}</p>

            <button aria-label="Remover coleção" onClick={handleRemoveConfirm}>
               <FaTrash className="cursor-pointer text-gray-600 hover:text-rose-600 transition duration-75 ease-in-out" />
            </button>
         </div>
      </div>
   );
};

export default CollectionCard;
