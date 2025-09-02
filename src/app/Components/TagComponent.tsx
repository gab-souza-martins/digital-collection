import React from "react";
import { FaX } from "react-icons/fa6";

interface TagComponentProps {
   id: string;
   name: string;
   removeTag: (index: string) => void;
}

const TagComponent: React.FC<TagComponentProps> = ({ id, name, removeTag }) => {
   const handleRemoveTag = () => {
      removeTag(id);
   };

   return (
      <div className="flex items-center gap-2 border border-dashed rounded-md pl-2 pr-1 bg-rose-600 text-white shadow-md">
         <span>{name}</span>

         <button
            aria-label="Remover etiqueta"
            onClick={handleRemoveTag}
            className="cursor-pointer p-1 rounded-full text-center hover:bg-gray-600/80"
         >
            <FaX />
         </button>
      </div>
   );
};
export default TagComponent;
