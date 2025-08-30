import { FaSearch } from "react-icons/fa";

const Searchbar = () => {
   return (
      <div>
         <form className="flex items-center gap-1">
            <input
               type="text"
               className="border border-gray-800 rounded-md py-1 px-2"
               placeholder="Pesquisar itens"
            />
            <button
               type="submit"
               className="cursor-pointer p-2 rounded-md text-white bg-emerald-600 shadow-sm
                        hover:bg-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
                        active:bg-emerald-800 active:border-emerald-800 active:shadow-md"
            >
               <FaSearch />
            </button>
         </form>
      </div>
   );
};

export default Searchbar;
