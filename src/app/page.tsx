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

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {items.map((itemTitle, itemIndex) => (
               <ItemCard
                  key={itemIndex}
                  i={itemIndex}
                  title={itemTitle}
                  removeItem={handleRemoveItem}
               />
            ))}
         </div>
      </div>
   );
}
