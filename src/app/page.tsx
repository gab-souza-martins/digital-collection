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
   isFav: boolean;
}

export default function Home() {
   // *Define os itens totais e os visualizados
   const [allItems, setAllItems] = React.useState<Item[]>([]);
   const [viewedItems, setViewedItems] = React.useState<Item[]>([]);

   React.useEffect(() => {
      const savedItems: string | null = localStorage.getItem("items");
      const parsed: Item[] = savedItems ? JSON.parse(savedItems) : [];
      setAllItems(parsed);
      setViewedItems(parsed);
   }, []);

   // *Define abertura e fechamento do formulário de adição
   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);
   const handleOpenAddForm = () => {
      setIsAddFormOpen(true);
   };
   const handleCloseAddForm = () => {
      setIsAddFormOpen(false);
   };

   // *Define adição e remoção de itens
   const handleAddItem = (
      title: string,
      description: string,
      image?: string
   ) => {
      const newItems = [
         ...allItems,
         { title, description, image, isFav: false },
      ];
      setAllItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };

   const [indexToRemove, setIndexToRemove] = React.useState<number>(-1);
   const [isConfirmRemoveOpen, setIsConfirmRemoveOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmRemove = (index: number) => {
      setIndexToRemove(index);
      setIsConfirmRemoveOpen(true);

      console.log(index);
   };
   const handleCloseConfirmRemove = () => {
      setIsConfirmRemoveOpen(false);
   };

   const handleConfirmRemoveItem = () => {
      const newItems = allItems.filter((i) => i !== viewedItems[indexToRemove]);
      setAllItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };

   // *Define favoritos
   const handleFavoriteEvent = (index: number) => {
      const newItems: Item[] | undefined = allItems.map((item) => {
         if (item === viewedItems[index]) {
            if (item.isFav) {
               item.isFav = false;
            } else {
               item.isFav = true;
            }
         }
         return item;
      });

      if (newItems) {
         setAllItems(newItems);
      }

      console.log(index);
   };

   // *Define ordenação dos itens
   const [sortAlphabetically, setSortAlphabetically] =
      React.useState<boolean>(false);

   // *Define os filtros de busca e ordenação
   const [searchTerm, setSearchTerm] = React.useState<string>("");
   const [imageFilter, setImageFilter] = React.useState<boolean>(false);

   React.useEffect(() => {
      let filteredItems: Item[] = allItems;

      //* Filtros de busca
      if (searchTerm.trim() !== "") {
         filteredItems = filteredItems.filter(
            (item) =>
               item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               item.description.toLowerCase().includes(searchTerm.toLowerCase())
         );
      }
      if (imageFilter) {
         filteredItems = allItems.filter(
            (item) => item.image !== "" && item.image !== undefined
         );
      }

      //* Filtros de ordenação
      if (sortAlphabetically) {
         filteredItems = [...filteredItems].sort((a, b) =>
            a.title.localeCompare(b.title)
         );
      }

      setViewedItems(filteredItems);
   }, [searchTerm, imageFilter, sortAlphabetically, allItems]);

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
            <ConfirmRemove
               confirmRemove={handleConfirmRemoveItem}
               closeRemove={handleCloseConfirmRemove}
            />
         )}

         <p className="text-gray-600">Tamanho da coleção: {allItems.length}</p>

         <Searchbar
            textSearch={handleTextSearch}
            imageFilter={handleImageFilter}
         />
         <br />

         {/* TODO: Passar para o seu próprio componente */}
         <label htmlFor="alphabeticalSort">Alfabético</label>
         <input
            onChange={(e) => setSortAlphabetically(e.target.checked)}
            type="checkbox"
            id="alphabeticalSort"
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
                  isFav={item.isFav}
                  favoriteEvent={handleFavoriteEvent}
                  openRemoveConfirm={handleOpenConfirmRemove}
               />
            ))}
         </div>
      </div>
   );
}
