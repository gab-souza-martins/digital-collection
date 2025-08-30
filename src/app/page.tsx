"use client";
import React from "react";
import OpenAddFormBtn from "./Components/OpenAddFormBtn";
import ItemCard from "./Components/ItemCard";
import AddForm from "./Components/AddForm";

interface Item {
   title: string;
   description: string;
   image?: string;
}

export default function Home() {
   const [items, setItems] = React.useState<Item[]>([]);

   React.useEffect(() => {
      const savedItems: string | null = localStorage.getItem("items");
      return savedItems ? setItems(JSON.parse(savedItems)) : setItems([]);
   }, []);

   const handleAddItem = (
      title: string,
      description: string,
      image?: string
   ) => {
      const newItems = [...items, { title, description, image }];
      setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };
   const handleRemoveItem = (index: number) => {
      const newItems = items.filter((i) => i !== items[index]);
      setItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
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
                  image={item.image}
                  removeItem={handleRemoveItem}
               />
            ))}
         </div>
      </div>
   );
}
