interface ItemCardProps {
   title: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ title }) => {
   return (
      <div className="w-2xs border rounded-lg p-4 shadow-md">
         <h2 className="text-2xl font-semibold">{title}</h2>
         <hr className="opacity-40" />
         <p>Descrição aqui.</p>
      </div>
   );
};

export default ItemCard;
