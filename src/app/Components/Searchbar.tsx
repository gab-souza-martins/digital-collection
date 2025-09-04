"use client";
import React from "react";

interface SearchbarProps {
   textSearch: (searchTerm: string) => void;
   imageFilter: (hasImage: boolean) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ textSearch, imageFilter }) => {
   const [textTerm, setTextTerm] = React.useState<string>("");

   return (
      <form className="flex flex-row items-center gap-2 2xs:gap-3">
         <input
            onChange={(e) => {
               setTextTerm(e.target.value);
               textSearch(e.target.value);
            }}
            type="text"
            className="border rounded-md py-1 px-2 w-40 2xs:w-59"
            style={{ borderColor: "var(--light-foreground)" }}
            value={textTerm}
            placeholder="Pesquisar itens"
            aria-label="Pesquisar itens"
         />

         <div className="flex items-center gap-1">
            <label
               htmlFor="imageFilter"
               className="cursor-pointer"
               style={{ color: "var(--light-foreground)" }}
            >
               Tem imagem
            </label>
            <input
               onChange={(e) => imageFilter(e.target.checked)}
               type="checkbox"
               id="imageFilter"
               className="cursor-pointer border rounded-md w-5 h-5"
               style={{ borderColor: "var(--light-foreground)" }}
               aria-label="Filtrar por imagem"
            />
         </div>
      </form>
   );
};

export default Searchbar;
