"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import AddForm from "./Components/AddForm";
import ConfirmRemove from "./Components/ConfirmRemove";
import Searchbar from "./Components/Searchbar";
import Sort from "./Components/Sort";
import OpenAddFormBtn from "./Components/Botões/OpenAddFormBtn";
import OpenRemoveAllBtn from "./Components/Botões/OpenRemoveAllBtn";
import CollectionCard from "./Components/CollectionCard";
import Link from "next/link";

interface Collection {
   id: string;
   title: string;
   description: string;
   dateCreated: string;
   image?: string;
   // items: Item[];
}

const Home = () => {
   // *Coleções totais e visualizadas
   const [allCollections, setAllCollections] = React.useState<Collection[]>([]);
   const [viewedCollections, setViewedCollections] = React.useState<
      Collection[]
   >([]);

   React.useEffect(() => {
      const savedCollections: string | null =
         localStorage.getItem("collections");
      const parsed: Collection[] = savedCollections
         ? JSON.parse(savedCollections)
         : [];
      setAllCollections(parsed);
      setViewedCollections(parsed);
   }, []);

   // *Abertura e fechamento do formulário de adição
   const [isAddCollectionFormOpen, setIsAddCollectionFormOpen] =
      React.useState<boolean>(false);
   const handleOpenAddCollectionForm = () => {
      setIsAddCollectionFormOpen(true);
   };
   const handleCloseAddCollectionForm = () => {
      setIsAddCollectionFormOpen(false);
   };

   // *Adição de coleções
   const handleAddCollection = (
      title: string,
      description: string,
      image?: string
   ) => {
      const newCollections = [
         ...allCollections,
         {
            id: uuidv4(),
            title,
            description,
            image,
            dateCreated: `Criado 
            em ${new Date().toLocaleDateString("pt-BR")} 
            às ${new Date().toLocaleTimeString("pt-BR")}`,
         },
      ];
      setAllCollections(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
   };

   // *Remoção de coleções
   const [idToRemove, setIdToRemove] = React.useState<string>("");
   const [isConfirmRemoveCollectionOpen, setIsConfirmRemoveCollectionOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmRemoveCollection = (id: string) => {
      setIdToRemove(id);
      setIsConfirmRemoveCollectionOpen(true);
   };
   const handleCloseConfirmRemoveCollection = () => {
      setIsConfirmRemoveCollectionOpen(false);
   };

   const handleConfirmRemoveCollection = () => {
      const newCollections = allCollections.filter((i) => i.id !== idToRemove);
      setAllCollections(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
   };

   // *Remoção de todas as coleções
   const [
      isConfirmRemoveAllCollectionsOpen,
      setIsConfirmRemoveAllCollectionsOpen,
   ] = React.useState<boolean>(false);

   const handleOpenConfirmRemoveAllCollections = () => {
      setIsConfirmRemoveAllCollectionsOpen(true);
   };
   const handleCloseConfirmRemoveAllCollections = () => {
      setIsConfirmRemoveAllCollectionsOpen(false);
   };
   const handleConfirmRemoveAllCollections = () => {
      localStorage.clear();
      setAllCollections([]);
   };

   // *Ordenação
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
      let filteredCollections: Collection[] = allCollections;

      // *Busca
      if (searchTerm.trim() !== "") {
         filteredCollections = filteredCollections.filter(
            (collection) =>
               collection.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
               collection.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
         );
      }
      if (imageFilter) {
         filteredCollections = allCollections.filter(
            (collection) =>
               collection.image !== "" && collection.image !== undefined
         );
      }

      // *Ordenação
      switch (sortValue) {
         case "date-reverse":
            filteredCollections = [...filteredCollections].reverse();
            break;
         case "alphabetical":
            filteredCollections = [...filteredCollections].sort((a, b) =>
               a.title.localeCompare(b.title)
            );
            break;
         case "alphabetical-reverse":
            filteredCollections = [...filteredCollections].sort((a, b) =>
               b.title.localeCompare(a.title)
            );
            break;
         default:
            break;
      }

      setViewedCollections(filteredCollections);
   }, [allCollections, searchTerm, imageFilter, sortValue]);

   const handleTextSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };
   const handleImageFilter = (hasImage: boolean) => {
      setImageFilter(hasImage);
   };

   return (
      <div className="p-4">
         <h1 className="text-3xl font-bold">Coleção digital</h1>

         {isAddCollectionFormOpen && (
            <AddForm
               onAdd={handleAddCollection}
               closeForm={handleCloseAddCollectionForm}
            />
         )}

         {isConfirmRemoveCollectionOpen && (
            <ConfirmRemove
               text="Remover uma coleção é uma ação irreversível."
               confirmRemove={handleConfirmRemoveCollection}
               closeRemove={handleCloseConfirmRemoveCollection}
            />
         )}

         {isConfirmRemoveAllCollectionsOpen && (
            <ConfirmRemove
               text="Remover as coleções é uma ação irreversível. Todos os itens serão perdidos."
               confirmRemove={handleConfirmRemoveAllCollections}
               closeRemove={handleCloseConfirmRemoveAllCollections}
            />
         )}

         <Searchbar
            textSearch={handleTextSearch}
            imageFilter={handleImageFilter}
         />

         <Sort sort={handleSort} />

         <div className="flex items-center gap-2">
            <OpenAddFormBtn openForm={handleOpenAddCollectionForm} />
            <OpenRemoveAllBtn
               openRemoveAll={handleOpenConfirmRemoveAllCollections}
            />
         </div>

         <br />

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
            {viewedCollections.map((collection) => (
               <Link key={collection.id} href={`colecao/${collection.id}/`}>
                  <CollectionCard
                     id={collection.id}
                     title={collection.title}
                     description={collection.description}
                     dateCreated={collection.dateCreated}
                     image={collection.image}
                     openRemoveConfirm={handleOpenConfirmRemoveCollection}
                  />
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Home;
