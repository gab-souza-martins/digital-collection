"use client";
import React from "react";
import BtnForm from "./Components/BtnForm";
import ItemCard from "./Components/ItemCard";

export default function Home() {
   const [items, setItems] = React.useState<string[]>([]);

   const handleAddItem = (title: string) => {
      setItems((prev) => [...prev, title]);
   };

   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold">Coleção digital</h1>
         <BtnForm onAdd={handleAddItem} />
         <br />
         {items.map((item, index) => (
            <ItemCard key={index} title={item} />
         ))}
      </div>
   );
}
