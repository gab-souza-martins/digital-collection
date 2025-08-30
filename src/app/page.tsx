"use client";
import React from "react";
import OpenAddFormBtn from "./Components/OpenAddFormBtn";
import ItemCard from "./Components/ItemCard";
import AddForm from "./Components/AddForm";
import Searchbar from "./Components/Searchbar";
import ConfirmRemove from "./Components/ConfirmRemove";

interface Item {
   title: string;
   description: string;
   image?: string;
}

export default function Home() {
   const [allItems, setAllItems] = React.useState<Item[]>([]);
   const [viewedItems, setViewedItems] = React.useState<Item[]>([]);
   React.useEffect(() => {
      const savedItems: string | null = localStorage.getItem("items");
      const parsed: Item[] = savedItems ? JSON.parse(savedItems) : [];
      setAllItems(parsed);
      setViewedItems(parsed);
   }, []);

   const [searchTerm, setSearchTerm] = React.useState<string>("");
   const [imageFilter, setImageFilter] = React.useState<boolean>(false);
   React.useEffect(() => {
      let filteredItems: Item[] = allItems;
      // TODO: Mudar ordem dos filtros
      if (imageFilter) {
         filteredItems = allItems.filter(
            (item) => item.image !== "" && item.image !== undefined
         );
      }

      if (searchTerm.trim() !== "") {
         filteredItems = filteredItems.filter(
            (item) =>
               item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.description.toLowerCase().includes(searchTerm.toLowerCase())
         );
      }

      setViewedItems(filteredItems);
   }, [searchTerm, imageFilter, allItems]);

   const handleAddItem = (
      title: string,
      description: string,
      image?: string
   ) => {
      const newItems = [...allItems, { title, description, image }];
      setAllItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };

   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);
   const handleOpenConfirmRemove = () => {
      setIsConfirmRemoveOpen(true);
   };
   const handleRemoveItem = (index: number) => {
      const newItems = allItems.filter((i) => i !== viewedItems[index]);
      setAllItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };
   const handleCloseConfirmRemove = () => {
      setIsConfirmRemoveOpen(false);
   };

   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);
   const handleOpenAddForm = () => {
      setIsAddFormOpen(true);
   };
   const handleCloseAddForm = () => {
      setIsAddFormOpen(false);
   };

   const handleTextSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };
   const handleImageFilter = (hasImage: boolean) => {
      setImageFilter(hasImage);
   };

   //
   //
   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold">Coleção digital</h1>

         {isAddFormOpen && (
            <AddForm onAdd={handleAddItem} closeForm={handleCloseAddForm} />
         )}

         {isConfirmRemoveOpen && (
            <ConfirmRemove closeRemove={handleCloseConfirmRemove} />
         )}

         <p className="text-gray-600">Tamanho da coleção: {allItems.length}</p>

         <Searchbar
            textSearch={handleTextSearch}
            imageFilter={handleImageFilter}
         />

         <OpenAddFormBtn openForm={handleOpenAddForm} />
         <br />

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {viewedItems.map((item, itemIndex) => (
               <ItemCard
                  key={itemIndex}
                  i={itemIndex}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  openRemoveConfirm={handleOpenConfirmRemove}
               />
            ))}
         </div>
      </div>
   );
}
