"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmRemove from "./Components/ConfirmRemove";
import Searchbar from "./Components/Searchbar";
import Sort from "./Components/Sort";
import OpenFormBtn from "./Components/Botões/OpenFormBtn";
import OpenRemoveAllBtn from "./Components/Botões/OpenRemoveAllBtn";
import CollectionCard from "./Components/CollectionCard";
import Link from "next/link";
import Collection from "./Types/CollectionType";
import TagFilter from "./Components/TagFilter";
import Tag from "./Types/TagType";
import AddAndEditForm from "./Components/AddAndEditForm";

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
      tags: Tag[],
      image?: string
   ) => {
      const newCollections = [
         ...allCollections,
         {
            id: uuidv4(),
            title,
            description,
            tags,
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
      const newCollections = allCollections.filter((c) => c.id !== idToRemove);
      setAllCollections(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
      localStorage.removeItem(`items-${idToRemove}`);
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

   // *Remoção de tags
   const handleRemoveTag = (collectionId: string, tagId: string) => {
      const newCollections = allCollections.map((c) => {
         if (c.id === collectionId) {
            return { ...c, tags: c.tags.filter((t) => t.id !== tagId) };
         }
         return c;
      });
      setAllCollections(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
   };

   // *useMemo para filtragem de tags
   const uniqueTags = React.useMemo(() => {
      const tagNames = allCollections.flatMap((c) => c.tags.map((t) => t.name));
      return Array.from(new Set(tagNames.sort((a, b) => a.localeCompare(b))));
   }, [allCollections]);

   // *Ordenação
   const [sortValue, setSortValue] = React.useState<string>("date");
   const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

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

      // *Tags
      if (selectedTags.length > 0) {
         filteredCollections = filteredCollections.filter((c) =>
            c.tags.some((t) => selectedTags.includes(t.name))
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

      // *
      setViewedCollections(filteredCollections);
   }, [allCollections, searchTerm, imageFilter, sortValue, selectedTags]);

   const handleTextSearch = (searchTerm: string) => {
      setSearchTerm(searchTerm);
   };
   const handleImageFilter = (hasImage: boolean) => {
      setImageFilter(hasImage);
   };

   return (
      <div className="p-4 md:px-6 lg:px-8">
         {isAddCollectionFormOpen && (
            <AddAndEditForm
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

         <header>
            <h1 className="text-3xl font-bold">Coleção digital</h1>

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

            <OpenFormBtn openForm={handleOpenAddCollectionForm} />
         </header>

         <hr className="mb-5 text-gray-400" />

         <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 ml:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
               {viewedCollections.map((c) => (
                  <Link key={c.id} href={`colecao/${c.id}/`}>
                     <CollectionCard
                        id={c.id}
                        title={c.title}
                        description={c.description}
                        dateCreated={c.dateCreated}
                        image={c.image}
                        tags={c.tags}
                        openRemoveConfirm={handleOpenConfirmRemoveCollection}
                        filterTags={handleRemoveTag}
                     />
                  </Link>
               ))}
            </div>

            <OpenRemoveAllBtn
               openRemoveAll={handleOpenConfirmRemoveAllCollections}
            />
         </main>
      </div>
   );
};

export default Home;
