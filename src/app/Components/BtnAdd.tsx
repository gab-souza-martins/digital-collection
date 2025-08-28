import { FaPlusCircle } from "react-icons/fa";

const BtnAdd = () => {
   return (
      <div>
         <button
            className="cursor-pointer rounded-lg flex items-center gap-2 p-2 text-white bg-emerald-600 shadow-sm
          hover:bg-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
          active:bg-emerald-800 active:shadow-md"
         >
            <FaPlusCircle />
            <span className="font-semibold">Adicionar item</span>
         </button>
      </div>
   );
};

export default BtnAdd;
