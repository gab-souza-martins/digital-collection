"use client";
import React from "react";
import BtnForm from "./Components/BtnForm";
import ItemCard from "./Components/ItemCard";

export default function Home() {
   const [items, setItems] = React.useState<string[]>([]);

   const handleAddItem = (title: string) => {
      setItems((prev) => [...prev, title]);
   };

   const handleRemoveItem = (index: number) => {
      setItems((prev) => {
         return prev.filter((i) => i !== prev[index]);
      });
   };

   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold">Coleção digital</h1>
         <BtnForm onAdd={handleAddItem} />
         <br />
         {items.map((item, itemIndex) => (
            <ItemCard
               key={itemIndex}
               i={itemIndex}
               title={item}
               removeItem={handleRemoveItem}
            />
         ))}
      </div>
   );
}
