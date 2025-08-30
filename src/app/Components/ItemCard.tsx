import Image from "next/image";
import { FaTrash } from "react-icons/fa";

interface ItemCardProps {
   i: number;
   title: string;
   description: string;
   image?: string;
   openRemoveConfirm: (index: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
   i,
   title,
   description,
   image,
   openRemoveConfirm,
}) => {
   const handleRemoveConfirm = () => {
      openRemoveConfirm(i);
   };

   const date: Date = new Date();

   return (
      <div className="w-2xs border rounded-lg p-4 shadow-md">
         <h2 className="text-2xl font-semibold">{title}</h2>

         {image && (
            <Image
               src={image}
               alt={title}
               className="rounded-md object-cover"
               width={300}
               height={300}
            />
         )}

         <hr className="opacity-40" />

         <p>{description}</p>

         <p className="text-sm text-gray-500 mt-2">
            Adicionado em {date.toLocaleDateString("pt-BR")}
         </p>

         <button aria-label="Remover item" onClick={handleRemoveConfirm}>
            <FaTrash className="text-gray-600 cursor-pointer hover:text-rose-600 transition duration-75 ease-in-out" />
         </button>
      </div>
   );
};

export default ItemCard;
