import { FaBan } from "react-icons/fa";

interface CancelBtnProps {
   onClickEvent: () => void;
}

const CancelBtn: React.FC<CancelBtnProps> = ({ onClickEvent }) => {
   const handleClickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClickEvent();
   };

   return (
      <button
         onClick={handleClickEvent}
         type="submit"
         className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-rose-600 border-2 border-rose-600 shadow-sm
                     hover:bg-rose-600 hover:text-white hover:shadow-xl transition duration-75 ease-in-out
                     active:bg-rose-700 active:border-rose-700 active:shadow-md"
      >
         <FaBan />
         <span className="font-semibold">Cancelar</span>
      </button>
   );
};

export default CancelBtn;
