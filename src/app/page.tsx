"use client";
import React from "react";
import OpenAddFormBtn from "./Components/OpenAddFormBtn";
import ItemCard from "./Components/ItemCard";
import AddForm from "./Components/AddForm";
import Searchbar from "./Components/Searchbar";
import ConfirmRemoveItem from "./Components/ConfirmRemoveItem";
import ItemSort from "./Components/ItemSort";
import OpenRemoveCollection from "./Components/OpenRemoveCollection";
import ConfirmRemoveCollection from "./Components/ConfirmRemoveCollection";

interface Item {
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
}

export default function Home() {
   // *Define os itens totais e os visualizados
   const [allItems, setAllItems] = React.useState<Item[]>([]);
   const [viewedItems, setViewedItems] = React.useState<Item[]>([]);

   React.useEffect(() => {
      const savedItems: string | null = localStorage.getItem("items");
      const parsedItems: Item[] = savedItems ? JSON.parse(savedItems) : [];
      setAllItems(parsedItems);
      setViewedItems(parsedItems);
   }, []);

   // *Define abertura e fechamento do formulário de adição
   const [isAddFormOpen, setIsAddFormOpen] = React.useState<boolean>(false);
   const handleOpenAddForm = () => {
      setIsAddFormOpen(true);
   };
   const handleCloseAddForm = () => {
      setIsAddFormOpen(false);
   };

   // *Define adição de itens
   const handleAddItem = (
      title: string,
      description: string,
      image?: string
   ) => {
      const newItems = [
         ...allItems,
         {
            title,
            description,
            image,
            dateAdded: `Adicionado 
            em ${new Date().toLocaleDateString("pt-BR")} 
            às ${new Date().toLocaleTimeString("pt-BR")}`,
            isFav: false,
         },
      ];
      setAllItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };

   // *Define remoção de itens
   const [indexToRemove, setIndexToRemove] = React.useState<number>(-1);
   const [isConfirmRemoveItemOpen, setIsConfirmRemoveItemOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmRemoveItem = (index: number) => {
      setIndexToRemove(index);
      setIsConfirmRemoveItemOpen(true);
   };
   const handleCloseConfirmRemoveItem = () => {
      setIsConfirmRemoveItemOpen(false);
   };

   const handleConfirmRemoveItem = () => {
      const newItems = allItems.filter((i) => i !== viewedItems[indexToRemove]);
      setAllItems(newItems);
      localStorage.setItem("items", JSON.stringify(newItems));
   };

   // *Define remoção de toda a coleção
   const [isConfirmRemoveCollectionOpen, setIsConfirmRemoveCollectionOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmRemoveCollection = () => {
      setIsConfirmRemoveCollectionOpen(true);
   };
   const handleCloseConfirmRemoveCollection = () => {
      setIsConfirmRemoveCollectionOpen(false);
   };
   const handleConfirmRemoveCollection = () => {
      localStorage.removeItem("items");
      setAllItems([]);
   };

   // *Define favoritos
   const handleFavoriteEvent = (i: number) => {
      const newItems: Item[] | undefined = allItems.map((item) => {
         if (item === viewedItems[i]) {
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
         localStorage.setItem("items", JSON.stringify(newItems));
      }
   };

   // *Define ordenação dos itens
   const [sortValue, setSortValue] = React.useState<string>("");

   React.useEffect(() => {
      const savedSortValue: string | null = localStorage.getItem("sortValue");

      const parsed: string = savedSortValue ? JSON.parse(savedSortValue) : "";

      setSortValue(parsed);
   }, []);

   const handleSort = (sort: string) => {
      setSortValue(sort);
      localStorage.setItem("sortValue", JSON.stringify(sort));
   };

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
      switch (sortValue) {
         case "date-reverse":
            filteredItems = [...filteredItems].reverse();
            break;
         case "alphabetical":
            filteredItems = [...filteredItems].sort((a, b) =>
               a.title.localeCompare(b.title)
            );
            break;
         case "alphabetical-reverse":
            filteredItems = [...filteredItems].sort((a, b) =>
               b.title.localeCompare(a.title)
            );
            break;
         default:
            break;
      }

      filteredItems = [...filteredItems].sort(
         ({ isFav: favA = false }, { isFav: favB = false }) =>
            Number(favB) - Number(favA)
      );

      setViewedItems(filteredItems);
   }, [allItems, searchTerm, imageFilter, sortValue]);

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

         {isConfirmRemoveItemOpen && (
            <ConfirmRemoveItem
               confirmRemoveItem={handleConfirmRemoveItem}
               closeRemoveItem={handleCloseConfirmRemoveItem}
            />
         )}

         {isConfirmRemoveCollectionOpen && (
            <ConfirmRemoveCollection
               confirmRemoveCollection={handleConfirmRemoveCollection}
               closeRemoveCollection={handleCloseConfirmRemoveCollection}
            />
         )}

         <p className="text-gray-600">Tamanho da coleção: {allItems.length}</p>

         <Searchbar
            textSearch={handleTextSearch}
            imageFilter={handleImageFilter}
         />

         <ItemSort sort={handleSort} />

         <div className="flex items-center gap-2">
            <OpenAddFormBtn openForm={handleOpenAddForm} />
            <OpenRemoveCollection
               openRemoveCollection={handleOpenConfirmRemoveCollection}
            />
         </div>

         <br />

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {viewedItems.map((item, itemIndex) => (
               <ItemCard
                  key={itemIndex}
                  i={itemIndex}
                  title={item.title}
                  description={item.description}
                  dateAdded={item.dateAdded}
                  image={item.image}
                  isFav={item.isFav}
                  favoriteEvent={handleFavoriteEvent}
                  openRemoveConfirm={handleOpenConfirmRemoveItem}
               />
            ))}
         </div>
      </div>
   );
}
