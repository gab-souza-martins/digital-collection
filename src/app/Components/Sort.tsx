import React from "react";
import { FaSort } from "react-icons/fa";

interface SortProps {
   sort: (value: string) => void;
}

const Sort: React.FC<SortProps> = ({ sort }) => {
   const [selectedSort, setSelectedSort] = React.useState<string>("date");
   const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      sort(selectedSort);
   };

   return (
      <div>
         <form className="flex flex-col items-start gap-1 2xs:flex-row 2xs:items-center 2xs:gap-3">
            <div className="flex flex-col items-start gap-2">
               <div className="flex items-center gap-1">
                  <label htmlFor="sortSelect">Ordenar por:</label>
                  <select
                     onChange={(e) => {
                        setSelectedSort(e.target.value);
                     }}
                     value={selectedSort}
                     id="sortSelect"
                     className="border rounded-md py-1 px-2"
                     style={{ borderColor: "var(--light-foreground)" }}
                  >
                     <option value="date">primeiro adicionado</option>
                     <option value="date-reverse">último adicionado</option>
                     <option value="alphabetical">título (A–Z)</option>
                     <option value="alphabetical-reverse">título (Z–A)</option>
                  </select>
               </div>
            </div>

            <button
               onClick={handleSort}
               type="submit"
               className="cursor-pointer rounded-md flex items-center gap-1 py-1 px-2 text-emerald-600 border-2 border-emerald-600
                          shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                          active:bg-emerald-700 active:border-emerald-700 active:shadow-md"
            >
               <FaSort />
               Ordenar
            </button>
         </form>
      </div>
   );
};

export default Sort;
