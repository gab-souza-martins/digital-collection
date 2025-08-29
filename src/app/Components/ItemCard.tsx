interface ItemCardProps {
   title: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ title }) => {
   const date: Date = new Date();

   return (
      <div className="w-2xs border rounded-lg p-4 shadow-md">
         <h2 className="text-2xl font-semibold">{title}</h2>
         <hr className="opacity-40" />
         <p>Descrição aqui.</p>
         <p className="text-sm text-gray-500 mt-2">
            Adicionado em {date.toLocaleDateString("pt-BR")}
         </p>
      </div>
   );
};

export default ItemCard;
