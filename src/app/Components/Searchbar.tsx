"use client";
import React from "react";

interface SearchbarProps {
   textSearch: (searchTerm: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ textSearch }) => {
   const [textTerm, setTextTerm] = React.useState<string>("");

   const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextTerm(e.target.value);
   };

   const handleSearch = (
      e: React.FormEvent<HTMLInputElement | HTMLFormElement>
   ) => {
      e.preventDefault();
      textSearch(textTerm);
   };

   return (
      <div>
         <form onSubmit={handleSearch} className="flex items-center gap-1">
            <input
               onChange={(e) => {
                  handleTextChange(e);
                  handleSearch(e);
               }}
               type="text"
               className="border border-gray-800 rounded-md py-1 px-2"
               placeholder="Pesquisar itens"
            />
         </form>
      </div>
   );
};

export default Searchbar;
