"use client";
import React from "react";

interface SearchbarProps {
   textSearch: (searchTerm: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ textSearch }) => {
   const [textTerm, setTextTerm] = React.useState<string>("");

   return (
      <div>
         <form className="flex items-center gap-1">
            <input
               onChange={(e) => {
                  setTextTerm(e.target.value);
                  textSearch(e.target.value);
               }}
               type="text"
               className="border border-gray-800 rounded-md py-1 px-2"
               value={textTerm}
               placeholder="Pesquisar itens"
            />
         </form>
      </div>
   );
};

export default Searchbar;
