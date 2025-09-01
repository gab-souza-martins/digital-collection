"use client";
import { useParams } from "next/navigation";
import React from "react";
import OpenAddFormBtn from "@/app/Components/Botões/OpenAddFormBtn";
import ItemCard from "@/app/Components/ItemCard";
import AddForm from "@/app/Components/AddForm";
import Searchbar from "@/app/Components/Searchbar";
import Sort from "@/app/Components/Sort";
import OpenRemoveAllBtn from "@/app/Components/Botões/OpenRemoveAllBtn";
import ConfirmRemove from "@/app/Components/ConfirmRemove";
import Link from "next/link";
import { FaCaretLeft } from "react-icons/fa";

interface Item {
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
}

const Collection = () => {
   const params = useParams();
   const { collectionId } = params;

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
   const [isAddItemFormOpen, setIsAddItemFormOpen] =
      React.useState<boolean>(false);
   const handleOpenAddItemForm = () => {
      setIsAddItemFormOpen(true);
   };
   const handleCloseAddItemForm = () => {
      setIsAddItemFormOpen(false);
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
   const [sortValue, setSortValue] = React.useState<string>("date");

   React.useEffect(() => {
      const savedSortValue: string | null = localStorage.getItem("sortValue");

      const parsed: string = savedSortValue
         ? JSON.parse(savedSortValue)
         : "date";

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
         <div className="flex items-center gap-2">
            <Link
               href={"../../"}
               className="text-xl p-2 rounded-full hover:bg-black hover:text-white transition duration-100 ease-in-out"
            >
               <FaCaretLeft />
            </Link>

            <h1 className="text-3xl font-bold">{collectionId}</h1>
         </div>

         {isAddItemFormOpen && (
            <AddForm onAdd={handleAddItem} closeForm={handleCloseAddItemForm} />
         )}

         {isConfirmRemoveItemOpen && (
            <ConfirmRemove
               text="Remover um item é uma ação irreversível."
               confirmRemove={handleConfirmRemoveItem}
               closeRemove={handleCloseConfirmRemoveItem}
            />
         )}

         {isConfirmRemoveCollectionOpen && (
            <ConfirmRemove
               text="Esvaziar a coleção é uma ação irreversível. Todos os itens dentro serão perdidos."
               confirmRemove={handleConfirmRemoveCollection}
               closeRemove={handleCloseConfirmRemoveCollection}
            />
         )}

         <p className="text-gray-600">Tamanho da coleção: {allItems.length}</p>

         <Searchbar
            textSearch={handleTextSearch}
            imageFilter={handleImageFilter}
         />

         <Sort sort={handleSort} />

         <div className="flex items-center gap-2">
            <OpenAddFormBtn openForm={handleOpenAddItemForm} />
            <OpenRemoveAllBtn
               openRemoveAll={handleOpenConfirmRemoveCollection}
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
};

export default Collection;
