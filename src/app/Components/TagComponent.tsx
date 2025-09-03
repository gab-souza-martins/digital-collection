import React from "react";
import { FaX } from "react-icons/fa6";

interface TagComponentProps {
   id: string;
   name: string;
   bgColor: string;
   textColor: string;
   removeTag: (index: string) => void;
   dragListeners?: React.HTMLAttributes<HTMLSpanElement>;
}

const TagComponent: React.FC<TagComponentProps> = ({
   id,
   name,
   bgColor,
   textColor,
   removeTag,
   dragListeners,
}) => {
   const handleRemoveTag = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      removeTag(id);
   };

   return (
      <div
         className="flex items-center gap-0 border border-dashed rounded-md shadow-md"
         style={{ backgroundColor: bgColor, color: textColor }}
      >
         <span
            onClick={(e) => e.stopPropagation()}
            {...(dragListeners || {})}
            className="break-all px-2"
         >
            {name}
         </span>

         <button
            aria-label="Remover etiqueta"
            onClick={handleRemoveTag}
            className="cursor-pointer p-1 rounded-full text-center hover:bg-gray-600/80 hover:text-white"
         >
            <FaX />
         </button>
      </div>
   );
};
export default TagComponent;
