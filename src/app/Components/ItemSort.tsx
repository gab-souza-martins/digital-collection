import React from "react";
import { FaSort } from "react-icons/fa";

interface ItemSortProps {
   sort: (value: string) => void;
}

const ItemSort: React.FC<ItemSortProps> = ({ sort }) => {
   const [selectedSort, setSelectedSort] = React.useState<string>("date");
   const handleSort = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      sort(selectedSort);
   };

   return (
      <div>
         <form className="flex items-center gap-3">
            <div className="flex items-center gap-1">
               <label htmlFor="sortSelect">Ordenar por:</label>
               <select
                  id="sortSelect"
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="border border-gray-600/50 rounded-md py-1 px-2"
               >
                  <option value="date">primeiro adicionado</option>
                  <option value="date-reverse">último adicionado</option>
                  <option value="alphabetical">título (A–Z)</option>
                  <option value="alphabetical-reverse">título (Z–A)</option>
               </select>
            </div>

            <button
               onClick={handleSort}
               type="submit"
               className="cursor-pointer rounded-md flex items-center gap-1 py-1 px-2 text-emerald-600 border-2 border-emerald-600
                          shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                          active:bg-emerald-700 active:border-emerald-700 active:shadow-md"
            >
               <FaSort />
               Filtrar
            </button>
         </form>
      </div>
   );
};

export default ItemSort;
