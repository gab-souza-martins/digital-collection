import React from "react";
import Image from "next/image";
import Tag from "../Types/TagType";
import TagComponent from "./TagComponent";
import { FaStar, FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
   arrayMove,
   rectSortingStrategy,
   SortableContext,
   useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardComponentProps {
   id: string;
   type: "coleção" | "item";
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
   tags: Tag[];
   favoriteEvent: (index: string) => void;
   openRemoveConfirm: (index: string) => void;
   openEditForm: (index: string) => void;
   filterTags: (id: string, tagId: string) => void;
   reorderTags: (id: string, newTags: Tag[]) => void;
}

const CardComponent: React.FC<CardComponentProps> = ({
   id,
   type,
   title,
   description,
   dateAdded,
   image,
   isFav,
   tags,
   favoriteEvent,
   openRemoveConfirm,
   openEditForm,
   filterTags,
   reorderTags,
}) => {
   const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      favoriteEvent(id);
   };

   const handleRemoveConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openRemoveConfirm(id);
   };

   const handleOpenEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      openEditForm(id);
   };

   // *Tags

   const handleFilterTags = (tagId: string) => {
      filterTags(id, tagId);
   };

   const SortableTag = ({ t }: { t: Tag }) => {
      const { attributes, listeners, setNodeRef, transform, transition } =
         useSortable({ id: t.id });

      const styles = {
         transform: CSS.Transform.toString(transform),
         transition,
      };

      return (
         <div ref={setNodeRef} style={styles} {...attributes}>
            <TagComponent
               id={t.id}
               name={t.name}
               bgColor={t.bgColor}
               textColor={t.textColor}
               removeTag={() => handleFilterTags(t.id)}
               dragListeners={listeners}
            />
         </div>
      );
   };

   return (
      <div className="flex flex-col w-2xs min-h-[100%] justify-start border rounded-lg p-4 shadow-md">
         <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold break-all">{title}</h2>

            <label htmlFor="marcarFav" className="hidden">
               Marcar como favorito
            </label>
            <button
               onClick={handleFavorite}
               aria-label="Marcar como favorito"
               id="marcarFav"
               className="cursor-pointer"
            >
               <FaStar
                  className={isFav ? "text-yellow-400" : "text-gray-300"}
               />
            </button>
         </div>

         {image && (
            <Image
               src={image}
               alt={title}
               className="rounded-md object-contain mb-3 max-h-80"
               width={300}
               height={300}
            />
         )}

         <hr className="my-2 text-gray-400" />

         <p className="min-h-12 mb-4 break-all whitespace-pre-wrap">
            {description}
         </p>

         <div
            className="mt-auto"
            onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
            }}
         >
            <div className="mb-2 flex items-center flex-wrap gap-2">
               <DndContext
                  collisionDetection={closestCenter}
                  onDragEnd={({ active, over }) => {
                     if (over !== null) {
                        if (active.id === over.id) {
                           return;
                        }
                        const oldIndex = tags.findIndex(
                           (t) => t.id === active.id
                        );
                        const newIndex = tags.findIndex(
                           (t) => t.id === over.id
                        );
                        const reordered = arrayMove(tags, oldIndex, newIndex);

                        reorderTags(id, reordered);
                     }
                  }}
               >
                  <SortableContext items={tags} strategy={rectSortingStrategy}>
                     {tags.map((t) => (
                        <SortableTag key={t.id} t={t} />
                     ))}
                  </SortableContext>
               </DndContext>
            </div>

            <p
               className="text-sm mb-2"
               style={{ color: "var(--light-foreground)" }}
            >
               {dateAdded}
            </p>

            <div
               className="text-lg flex items-center gap-4"
               style={{ color: "var(--light-foreground)" }}
            >
               <label htmlFor="editar" className="hidden">
                  Editar {type}
               </label>
               <button
                  onClick={handleOpenEdit}
                  aria-label="Botão de editar"
                  id="editar"
               >
                  <FaPenToSquare className="cursor-pointer hover:text-emerald-600 active:text-emerald-700 transition duration-75 ease-in-out" />
               </button>

               <label htmlFor="remover" className="hidden">
                  Remover {type}
               </label>
               <button
                  onClick={handleRemoveConfirm}
                  aria-label="Botão de remover"
                  id="remover"
               >
                  <FaTrash className="cursor-pointer hover:text-rose-600 active:text-rose-700 transition duration-75 ease-in-out" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default CardComponent;
