"use client";
import React from "react";

interface SearchbarProps {
   textSearch: (searchTerm: string) => void;
   imageFilter: (hasImage: boolean) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ textSearch, imageFilter }) => {
   const [textTerm, setTextTerm] = React.useState<string>("");

   return (
      <div>
         <form className="flex flex-col items-start gap-2 xs:flex-row xs:items-center xs:gap-3">
            <input
               onChange={(e) => {
                  setTextTerm(e.target.value);
                  textSearch(e.target.value);
               }}
               type="text"
               className="border border-gray-800 rounded-md py-1 px-2"
               value={textTerm}
               placeholder="Pesquisar itens"
               aria-label="Pesquisar itens"
            />

            <div className="flex items-center gap-1">
               <label
                  htmlFor="imageFilter"
                  className="cursor-pointer text-gray-700"
               >
                  Possui imagem
               </label>
               <input
                  onChange={(e) => imageFilter(e.target.checked)}
                  type="checkbox"
                  id="imageFilter"
                  className="cursor-pointer border border-gray-800 rounded-md w-5 h-5"
                  aria-label="Filtrar por imagem"
               />
            </div>
         </form>
      </div>
   );
};

export default Searchbar;
