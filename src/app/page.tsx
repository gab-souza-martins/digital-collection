"use client";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmRemove from "./Components/ConfirmRemove";
import Searchbar from "./Components/Searchbar";
import Sort from "./Components/Sort";
import OpenAddFormBtn from "./Components/Botões/OpenAddFormBtn";
import OpenRemoveAllBtn from "./Components/Botões/OpenRemoveAllBtn";
import CardComponent from "./Components/CardComponent";
import Card from "./Types/CardType";
import Link from "next/link";
import TagFilter from "./Components/TagFilter";
import Tag from "./Types/TagType";
import AddAndEditForm from "./Components/AddAndEditForm";
import InitialEditValues from "./Types/InitialEditValues";
import Footer from "./Components/Footer";

const Home = () => {
   // *Coleções totais e visualizadas
   const [allCollections, setAllCollections] = React.useState<Card[]>([]);
   const [viewedCollections, setViewedCollections] = React.useState<Card[]>([]);

   React.useEffect(() => {
      const savedCollections: string | null =
         localStorage.getItem("collections");

      const parsed: Card[] = savedCollections
         ? JSON.parse(savedCollections)
         : [];

      setAllCollections(parsed);
      setViewedCollections(parsed);
   }, []);

   // *Adição de coleções
   const [isAddCollectionFormOpen, setIsAddCollectionFormOpen] =
      React.useState<boolean>(false);

   const handleOpenAddCollectionForm = () => {
      setIsAddCollectionFormOpen(true);
   };

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
            dateAdded: `Adicionado 
            em ${new Date().toLocaleDateString("pt-BR")} 
            às ${new Date().toLocaleTimeString("pt-BR")}`,
            isFav: false,
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

   const handleConfirmRemoveCollection = () => {
      const newCollections = allCollections.filter((c) => c.id !== idToRemove);
      setAllCollections(newCollections);
      localStorage.setItem("collections", JSON.stringify(newCollections));
      localStorage.removeItem(`items-${idToRemove}`);
   };

   // *Edição de coleções
   const [idToEdit, setIdToEdit] = React.useState<string>("");
   const [isEditCollectionOpen, setIsEditCollectionOpen] =
      React.useState<boolean>(false);
   const [valuesToEdit, setValuesToEdit] = React.useState<InitialEditValues>();

   const handleOpenEditCollection = (id: string) => {
      const collectionToEdit = allCollections.find((c) => c.id === id);
      if (collectionToEdit) {
         setValuesToEdit({
            title: `${collectionToEdit.title}`,
            description: `${collectionToEdit.description}`,
            tags: collectionToEdit.tags,
            image: `${collectionToEdit.image}`,
         });
      }
      setIdToEdit(id);
      setIsEditCollectionOpen(true);
   };

   const handleEditCollection = (
      newTitle: string,
      newDescription: string,
      newTags: Tag[],
      newImage?: string
   ) => {
      const newCollections = allCollections.map((c) => {
         if (c.id === idToEdit) {
            return {
               ...c,
               title: newTitle,
               description: newDescription,
               tags: newTags,
               image: newImage,
            };
         }
         return c;
      });
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

   const handleConfirmRemoveAllCollections = () => {
      localStorage.clear();
      setAllCollections([]);
   };

   // *Fechar tudo
   const handleClose = () => {
      setIsAddCollectionFormOpen(false);
      setIsConfirmRemoveCollectionOpen(false);
      setIsConfirmRemoveAllCollectionsOpen(false);
      setIsEditCollectionOpen(false);
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

   // *Reordenar tags
   const handleReorderTags = (id: string, newTags: Tag[]) => {
      const newCollections = allCollections.map((c) => {
         if (c.id === id) {
            return { ...c, tags: newTags };
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

   // *Favoritos
   const handleFavoriteEvent = (id: string) => {
      const newCollections: Card[] = allCollections.map((c) => {
         if (c.id === id) {
            if (c.isFav) {
               c.isFav = false;
            } else {
               c.isFav = true;
            }
         }
         return c;
      });

      if (newCollections) {
         setAllCollections(newCollections);
         localStorage.setItem("collections", JSON.stringify(newCollections));
      }
   };

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
      let filteredCollections: Card[] = allCollections;

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

      // *Ordenação de favoritos
      filteredCollections = [...filteredCollections].sort(
         ({ isFav: favA = false }, { isFav: favB = false }) =>
            Number(favB) - Number(favA)
      );

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
               mode="add"
               onAdd={handleAddCollection}
               onEdit={handleEditCollection}
               closeForm={handleClose}
            />
         )}

         {isEditCollectionOpen && (
            <AddAndEditForm
               mode="edit"
               initialEditValues={valuesToEdit}
               onAdd={handleAddCollection}
               onEdit={handleEditCollection}
               closeForm={handleClose}
            />
         )}

         {isConfirmRemoveCollectionOpen && (
            <ConfirmRemove
               text="Remover uma coleção é uma ação irreversível."
               confirmRemove={handleConfirmRemoveCollection}
               closeRemove={handleClose}
            />
         )}

         {isConfirmRemoveAllCollectionsOpen && (
            <ConfirmRemove
               text="Remover as coleções é uma ação irreversível. Todos os itens serão perdidos."
               confirmRemove={handleConfirmRemoveAllCollections}
               closeRemove={handleClose}
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

            <OpenAddFormBtn openForm={handleOpenAddCollectionForm} />
         </header>

         <hr className="mb-5 text-gray-400" />

         <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 ml:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
               {viewedCollections.map((c) => (
                  <Link key={c.id} href={`colecao/${c.id}/`}>
                     <CardComponent
                        id={c.id}
                        type="coleção"
                        title={c.title}
                        description={c.description}
                        dateAdded={c.dateAdded}
                        image={c.image}
                        isFav={c.isFav}
                        tags={c.tags}
                        favoriteEvent={handleFavoriteEvent}
                        openRemoveConfirm={handleOpenConfirmRemoveCollection}
                        openEditForm={handleOpenEditCollection}
                        filterTags={handleRemoveTag}
                        reorderTags={handleReorderTags}
                     />
                  </Link>
               ))}
            </div>

            <OpenRemoveAllBtn
               openRemoveAll={handleOpenConfirmRemoveAllCollections}
            />
         </main>

         <hr className="my-5 text-gray-400" />

         <footer>
            <Footer />
         </footer>
      </div>
   );
};

export default Home;
