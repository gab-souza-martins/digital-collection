import React from "react";
import { FC } from "react";
import { FaCaretDown } from "react-icons/fa";

interface TagFilterProps {
   tagNames: string[];
   selectedTags: string[];
   onCheck: (selected: string[]) => void;
}

const TagFilter: FC<TagFilterProps> = ({ tagNames, selectedTags, onCheck }) => {
   const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
   const handleDropdown = () => {
      if (!isDropdownOpen) {
         setIsDropdownOpen(true);
      } else {
         setIsDropdownOpen(false);
      }
   };

   const handleCheck = (tag: string) => {
      if (selectedTags.includes(tag)) {
         onCheck(selectedTags.filter((t) => t !== tag));
      } else {
         onCheck([...selectedTags, tag]);
      }
   };
   return (
      <div>
         <button
            onClick={handleDropdown}
            className="cursor-pointer rounded-md flex items-center gap-1 py-1 px-2 text-emerald-600 border-2 border-emerald-600
                       shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                       active:bg-emerald-700 active:border-emerald-700 active:shadow-md"
         >
            <span>Filtrar etiquetas</span>
            <FaCaretDown />
         </button>

         {isDropdownOpen && (
            <ul
               className="absolute block border rounded-sm shadow-lg p-2 max-w-50 max-h-48 overflow-auto"
               style={{
                  backgroundColor: "var(--background)",
                  borderColor: "var(--light-foreground)",
               }}
            >
               {tagNames.map((t) => (
                  <li key={t} className="mb-1">
                     <label htmlFor={t} className="cursor-pointer break-all">
                        <input
                           onChange={() => handleCheck(t)}
                           checked={selectedTags.includes(t)}
                           type="checkbox"
                           id={t}
                           className="cursor-pointer"
                        />
                        &nbsp;{t}
                     </label>
                  </li>
               ))}
            </ul>
         )}
      </div>
   );
};
export default TagFilter;
