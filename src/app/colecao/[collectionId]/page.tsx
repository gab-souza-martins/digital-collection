"use client";
import { useParams } from "next/navigation";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import OpenAddFormBtn from "@/app/Components/Botões/OpenAddFormBtn";
import ItemCard from "@/app/Components/ItemCard";
import AddForm from "@/app/Components/AddForm";
import Searchbar from "@/app/Components/Searchbar";
import Sort from "@/app/Components/Sort";
import OpenRemoveAllBtn from "@/app/Components/Botões/OpenRemoveAllBtn";
import ConfirmRemove from "@/app/Components/ConfirmRemove";
import Link from "next/link";
import { FaCaretLeft } from "react-icons/fa";
import Item from "@/app/Types/ItemType";
import Collection from "@/app/Types/CollectionType";

const CollectionPage = () => {
   const params = useParams();
   const { collectionId } = params;

   // *Nome da coleção
   const [collectionName, setCollectionName] = React.useState<string>("");

   React.useEffect(() => {
      const savedCollections: string | null =
         localStorage.getItem("collections");

      const parsed: Collection[] = savedCollections
         ? JSON.parse(savedCollections)
         : [];

      const currentCollection: Collection | undefined = parsed.find(
         (c) => c.id === collectionId
      );

      if (currentCollection) {
         setCollectionName(currentCollection.title);
      }
   }, [collectionId]);

   // *Itens totais e os visualizados
   const [allItems, setAllItems] = React.useState<Item[]>([]);
   const [viewedItems, setViewedItems] = React.useState<Item[]>([]);

   React.useEffect(() => {
      const savedItems: string | null = localStorage.getItem(
         `items-${collectionId}`
      );
      const parsed: Item[] = savedItems ? JSON.parse(savedItems) : [];

      setAllItems(parsed);
      setViewedItems(parsed);
   }, [collectionId]);

   // *Abertura e fechamento do formulário de adição
   const [isAddItemFormOpen, setIsAddItemFormOpen] =
      React.useState<boolean>(false);
   const handleOpenAddItemForm = () => {
      setIsAddItemFormOpen(true);
   };
   const handleCloseAddItemForm = () => {
      setIsAddItemFormOpen(false);
   };

   // *Adição de itens
   const handleAddItem = (
      title: string,
      description: string,
      image?: string
   ) => {
      const newItems = [
         ...allItems,
         {
            id: uuidv4(),
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
      localStorage.setItem(`items-${collectionId}`, JSON.stringify(newItems));
   };

   // *Remoção de itens
   const [idToRemove, setIdToRemove] = React.useState<string>("");
   const [isConfirmRemoveItemOpen, setIsConfirmRemoveItemOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmRemoveItem = (index: string) => {
      setIdToRemove(index);
      setIsConfirmRemoveItemOpen(true);
   };
   const handleCloseConfirmRemoveItem = () => {
      setIsConfirmRemoveItemOpen(false);
   };

   const handleConfirmRemoveItem = () => {
      const newItems = allItems.filter((i) => i.id !== idToRemove);
      setAllItems(newItems);
      localStorage.setItem(`items-${collectionId}`, JSON.stringify(newItems));
   };

   // *Remoção de toda a coleção
   const [isConfirmEmptyCollectionOpen, setIsConfirmEmptyCollectionOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmEmptyCollection = () => {
      setIsConfirmEmptyCollectionOpen(true);
   };
   const handleCloseConfirmEmptyCollection = () => {
      setIsConfirmEmptyCollectionOpen(false);
   };
   const handleConfirmEmptyCollection = () => {
      localStorage.removeItem(`items-${collectionId}`);
      setAllItems([]);
   };

   // *Favoritos
   const handleFavoriteEvent = (i: string) => {
      const newItems: Item[] | undefined = allItems.map((item) => {
         if (item.id === i) {
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
         localStorage.setItem(
            `items-${collectionId}`,
            JSON.stringify(newItems)
         );
      }
   };

   // *Ordenação dos itens
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

   // *Filtros de busca e ordenação
   const [searchTerm, setSearchTerm] = React.useState<string>("");
   const [imageFilter, setImageFilter] = React.useState<boolean>(false);

   React.useEffect(() => {
      let filteredItems: Item[] = allItems;

      // *Busca
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

      // *Ordenação
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

      // *Ordenação de favoritos
      filteredItems = [...filteredItems].sort(
         ({ isFav: favA = false }, { isFav: favB = false }) =>
            Number(favB) - Number(favA)
      );

      // *
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

            <h1 className="text-3xl font-bold">{collectionName}</h1>
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

         {isConfirmEmptyCollectionOpen && (
            <ConfirmRemove
               text="Esvaziar a coleção é uma ação irreversível. Todos os itens dentro serão perdidos."
               confirmRemove={handleConfirmEmptyCollection}
               closeRemove={handleCloseConfirmEmptyCollection}
            />
         )}

         <p className="text-gray-600">Tamanho da coleção: {allItems.length}</p>

         <Searchbar
            textSearch={handleTextSearch}
            imageFilter={handleImageFilter}
         />

         <Sort sort={handleSort} />

         <OpenAddFormBtn openForm={handleOpenAddItemForm} />

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {viewedItems.map((item) => (
               <ItemCard
                  key={item.id}
                  id={item.id}
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

         <OpenRemoveAllBtn openRemoveAll={handleOpenConfirmEmptyCollection} />
      </div>
   );
};

export default CollectionPage;
