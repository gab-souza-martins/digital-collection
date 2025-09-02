import React from "react";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import TagComponent from "./TagComponent";
import Tag from "../Types/TagType";
import { FaPenToSquare } from "react-icons/fa6";

interface CollectionCardProps {
   id: string;
   title: string;
   description: string;
   dateCreated: string;
   image?: string;
   tags: Tag[];
   openRemoveConfirm: (id: string) => void;
   openEditForm: (index: string) => void;
   filterTags: (collectionId: string, tagId: string) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
   id,
   title,
   description,
   dateCreated,
   image,
   tags,
   openRemoveConfirm,
   openEditForm,
   filterTags,
}) => {
   const handleRemoveConfirm = () => {
      openRemoveConfirm(id);
   };

   const handleOpenEdit = () => {
      openEditForm(id);
   };

   const handleFilterTags = (tagId: string) => {
      filterTags(id, tagId);
   };

   return (
      <div className="flex flex-col w-2xs min-h-[100%] justify-start border rounded-lg p-4 shadow-md">
         <h2 className="text-2xl font-semibold break-all">{title}</h2>

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

            <p className="text-sm text-gray-500 mb-2">{dateCreated}</p>

            <div className="text-lg text-gray-600 flex items-center gap-4">
               <button aria-label="Editar item" onClick={handleOpenEdit}>
                  <FaPenToSquare className=" cursor-pointer hover:text-emerald-600 transition duration-75 ease-in-out" />
               </button>

               <button aria-label="Remover item" onClick={handleRemoveConfirm}>
                  <FaTrash className="cursor-pointer hover:text-rose-600 transition duration-75 ease-in-out" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default CollectionCard;
