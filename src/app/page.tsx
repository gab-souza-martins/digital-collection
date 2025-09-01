"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";

interface Collection {
   title: string;
   description: string;
   dateCreated: string;
   image?: string;
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
   const [indexToRemove, setIndexToRemove] = React.useState<number>(-1);
   const [isConfirmRemoveCollectionOpen, setIsConfirmRemoveCollectionOpen] =
      React.useState<boolean>(false);

   const handleOpenConfirmRemoveCollection = (index: number) => {
      setIndexToRemove(index);
      setIsConfirmRemoveCollectionOpen(true);
   };
   const handleCloseConfirmRemoveCollection = () => {
      setIsConfirmRemoveCollectionOpen(false);
   };

   const handleConfirmRemoveCollection = () => {
      const newCollections = allCollections.filter(
         (i) => i !== viewedCollections[indexToRemove]
      );
      setAllCollections(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
   };

   // *Remoção de todas as coleções
   const [
      isConfirmRemoveAllCollectionsOpen,
      setIsConfirmRemoveAllCollectionsOpen,
   ] = React.useState<boolean>(false);

   const handleOpenConfirmRemoveAllCollections = () => {
      setIsConfirmRemoveCollectionOpen(true);
   };
   const handleCloseConfirmRemoveAllCollections = () => {
      setIsConfirmRemoveCollectionOpen(false);
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

   // *Define os filtros de busca e ordenação
   const [searchTerm, setSearchTerm] = React.useState<string>("");
   const [imageFilter, setImageFilter] = React.useState<boolean>(false);

   React.useEffect(() => {
      let filteredCollections: Collection[] = allCollections;

      //* Filtros de busca
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

      //* Filtros de ordenação
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
      </div>
   );
};

export default Home;
