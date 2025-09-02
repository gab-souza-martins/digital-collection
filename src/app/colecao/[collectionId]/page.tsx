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
import { FaArrowLeft } from "react-icons/fa";
import Item from "@/app/Types/ItemType";
import Collection from "@/app/Types/CollectionType";
import Tag from "@/app/Types/TagType";
import TagFilter from "@/app/Components/TagFilter";

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
      tags: Tag[],
      image?: string
   ) => {
      const newItems = [
         ...allItems,
         {
            id: uuidv4(),
            title,
            description,
            tags,
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
      const newItems: Item[] = allItems.filter((i) => i.id !== idToRemove);
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

   // *Remoção de tags
   const handleRemoveTag = (itemId: string, tagId: string) => {
      const newItems = allItems.map((i) => {
         if (i.id === itemId) {
            return { ...i, tags: i.tags.filter((t) => t.id !== tagId) };
         }
         return i;
      });
      setAllItems(newItems);
      localStorage.setItem(`items-${collectionId}`, JSON.stringify(newItems));
   };

   // *useMemo para filtragem de tags
   const uniqueTags = React.useMemo(() => {
      const tagNames = allItems.flatMap((i) => i.tags.map((t) => t.name));
      return Array.from(new Set(tagNames.sort((a, b) => a.localeCompare(b))));
   }, [allItems]);

   // *Favoritos
   const handleFavoriteEvent = (id: string) => {
      const newItems: Item[] = allItems.map((i) => {
         if (i.id === id) {
            if (i.isFav) {
               i.isFav = false;
            } else {
               i.isFav = true;
            }
         }
         return i;
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
   const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

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
         filteredItems = filteredItems.filter(
            (item) => item.image !== "" && item.image !== undefined
         );
      }

      // *Tags
      if (selectedTags.length > 0) {
         filteredItems = filteredItems.filter((i) =>
            i.tags.some((t) => selectedTags.includes(t.name))
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
   }, [allItems, searchTerm, imageFilter, selectedTags, sortValue]);

   const handleTextSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };
   const handleImageFilter = (hasImage: boolean) => {
      setImageFilter(hasImage);
   };

   //
   //
   return (
      <div className="p-4 md:px-6 lg:px-8">
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

         <header>
            <div className="flex items-center gap-2">
               <Link
                  href={"../../"}
                  className="text-lg text-center p-2 rounded-full hover:bg-black hover:text-white transition duration-100 ease-in-out"
               >
                  <FaArrowLeft />
               </Link>
               <h1 className="text-3xl font-bold">{collectionName}</h1>
            </div>

            <div className="my-5 flex flex-wrap gap-4 lg:gap-10">
               <Searchbar
                  textSearch={handleTextSearch}
                  imageFilter={handleImageFilter}
               />
               <TagFilter
                  tagNames={uniqueTags}
                  selectedTags={selectedTags}
                  onCheck={setSelectedTags}
               />
               <Sort sort={handleSort} />
            </div>

            <OpenAddFormBtn openForm={handleOpenAddItemForm} />
         </header>

         <hr className="mb-5 text-gray-400" />

         <p className="text-gray-600 mb-3">
            Tamanho da coleção: {allItems.length}
         </p>

         <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 ml:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
               {viewedItems.map((i) => (
                  <ItemCard
                     key={i.id}
                     id={i.id}
                     title={i.title}
                     description={i.description}
                     dateAdded={i.dateAdded}
                     image={i.image}
                     isFav={i.isFav}
                     tags={i.tags}
                     favoriteEvent={handleFavoriteEvent}
                     filterTags={handleRemoveTag}
                     openRemoveConfirm={handleOpenConfirmRemoveItem}
                  />
               ))}
            </div>

            <OpenRemoveAllBtn
               openRemoveAll={handleOpenConfirmEmptyCollection}
            />
         </main>
      </div>
   );
};

export default CollectionPage;
