import BtnAdd from "./Components/BtnAdd";
import ItemCard from "./Components/ItemCard";

export default function Home() {
   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold">Coleção digital</h1>
         <BtnAdd />
         <br />
         <ItemCard />
      </div>
   );
}
