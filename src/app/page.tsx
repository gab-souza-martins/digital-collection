"use client";
import React from "react";
import OpenAddFormBtn from "./Components/OpenAddFormBtn";
import ItemCard from "./Components/ItemCard";
import AddForm from "./Components/AddForm";

interface Item {
   title: string;
   description: string;
}

export default function Home() {
   const [items, setItems] = React.useState<Item[]>([]);
   const handleAddItem = (title: string, description: string) => {
      setItems((prev) => [...prev, { title, description }]);
   };
   const handleRemoveItem = (index: number) => {
      setItems((prev) => {
         return prev.filter((i) => i !== prev[index]);
      });
   };

   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);
   const handleOpenAddForm = () => {
      setIsAddFormOpen(true);
   };
   const handleCloseAddForm = () => {
      setIsAddFormOpen(false);
   };

   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold">Coleção digital</h1>

         {isAddFormOpen && (
            <AddForm onAdd={handleAddItem} closeForm={handleCloseAddForm} />
         )}

         <OpenAddFormBtn openForm={handleOpenAddForm} />
         <br />

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {items.map((item, itemIndex) => (
               <ItemCard
                  key={itemIndex}
                  i={itemIndex}
                  title={item.title}
                  description={item.description}
                  removeItem={handleRemoveItem}
               />
            ))}
         </div>
      </div>
   );
}
