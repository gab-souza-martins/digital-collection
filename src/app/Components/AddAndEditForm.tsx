"use client";
import React from "react";
import Image from "next/image";
import { FaPlus, FaFileImage, FaTag } from "react-icons/fa";
import CancelBtn from "./Botões/CancelBtn";
import Tag from "../Types/TagType";
import { v4 as uuidv4 } from "uuid";
import TagComponent from "./TagComponent";
import InitialEditValues from "../Types/InitialEditValues";
import { FaFloppyDisk, FaX } from "react-icons/fa6";

interface AddAndEditFormProps {
   mode: "add" | "edit";
   initialEditValues?: InitialEditValues;
   onAdd: (
      title: string,
      description: string,
      tags: Tag[],
      image?: string
   ) => void;
   onEdit: (
      title: string,
      description: string,
      tags: Tag[],
      image?: string
   ) => void;
   closeForm: () => void;
}

const AddAndEditForm: React.FC<AddAndEditFormProps> = ({
   mode,
   initialEditValues,
   onAdd,
   onEdit,
   closeForm,
}) => {
   React.useEffect(() => {
      if (initialEditValues) {
         setName(initialEditValues.title);
         setDescription(initialEditValues.description);
         setItemTags(initialEditValues.tags);
         if (initialEditValues.image) {
            setImageBase64(initialEditValues.image);
            setHasSelectedImage(true);
         }
      }
   }, [initialEditValues]);

   // *Handlers de nome e descrição
   const [name, setName] = React.useState<string>("");
   const [description, setDescription] = React.useState<string>("");

   // *Handlers e funções das tags
   const [tagInput, setTagInput] = React.useState<string>("");
   const [itemTags, setItemTags] = React.useState<Tag[]>([]);
   const [tagBgColor, setTagBgColor] = React.useState<string>("#000");
   const [tagTextColor, setTagTextColor] = React.useState<string>("#fff");

   const addTag = (
      e:
         | React.MouseEvent<HTMLButtonElement>
         | React.KeyboardEvent<HTMLInputElement>
   ) => {
      e.preventDefault();

      if (!tagInput.trim()) {
         return;
      } else {
         setItemTags((prev) => [
            ...prev,
            {
               id: uuidv4(),
               name: tagInput.trim(),
               bgColor: tagBgColor,
               textColor: tagTextColor,
            },
         ]);
         setTagInput("");
      }
   };

   const filterTag = (index: string) => {
      const newTags = itemTags.filter((t) => t.id !== index);
      setItemTags(newTags);
   };

   const tagText = (hex: string) => {
      const rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      if (rgb) {
         const r: number = parseInt(rgb[1], 16);
         const g: number = parseInt(rgb[2], 16);
         const b: number = parseInt(rgb[3], 16);

         const luma: number = g * 0.7152 + r * 0.2126 + b * 0.0722;

         if (luma > 128) {
            setTagTextColor("#000");
         } else {
            setTagTextColor("#fff");
         }
      }
   };

   // *Converter imagem para base64 e mostrá-la no form
   const fileToBase64 = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setImageBase64(reader.result as string);
      };
      reader.onerror = (error) => {
         console.log("Error:", error);
      };
   };
   const [imageBase64, setImageBase64] = React.useState<string>("");
   const [hasSelectedImage, setHasSelectedImage] =
      React.useState<boolean>(false);

   // *Handlers de erro
   const [nameError, setNameError] = React.useState<boolean>(false);
   const [descriptionError, setDescriptionError] =
      React.useState<boolean>(false);

   // *Handler de submit
   const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      if (name.trim() && description.trim()) {
         if (mode === "edit") {
            onEdit(name, description, itemTags, imageBase64);
         } else {
            onAdd(name, description, itemTags, imageBase64);
         }
         closeForm();
      } else {
         if (!name.trim()) {
            setNameError(true);
         } else {
            setNameError(false);
         }
         if (!description.trim()) {
            setDescriptionError(true);
         } else {
            setDescriptionError(false);
         }
         return;
      }
   };

   // *Foco de tabulação
   const focusRef = React.useRef<HTMLInputElement>(null);
   React.useEffect(() => {
      if (focusRef.current) {
         focusRef.current.focus();
      }
   });

   return (
      <div className="w-screen h-screen fixed top-0 left-0 bg-neutral-950/50 flex justify-center items-center z-10">
         <div
            className="border p-6 rounded-lg shadow-lg w-70 sm:w-96"
            style={{
               backgroundColor: "var(--background)",
               borderColor: "var(--light-foreground)",
            }}
         >
            <form className="flex flex-col gap-3">
               <input
                  onChange={(e) => setName(e.target.value)}
                  ref={focusRef}
                  tabIndex={-1}
                  aria-label="Nome"
                  aria-required={true}
                  className={`border required-input ${
                     nameError ? "not-inputted" : ""
                  } rounded-md p-2`}
                  type="text"
                  value={name}
                  placeholder="Nome"
               />

               <div
                  className="border rounded-md p-2 flex flex-col gap-2"
                  style={{
                     borderColor: "var(--light-foreground)",
                  }}
               >
                  <div className="flex items-center justify-between">
                     <span className="text-semibold text-neutral-500">
                        Imagem (opcional)
                     </span>

                     <button
                        onClick={(e) => {
                           e.preventDefault();
                           setImageBase64("");
                           setHasSelectedImage(false);
                        }}
                        aria-label="Remover imagem"
                        className="cursor-pointer text-gray-400 hover:text-rose-600 active:text-rose-700 
                                   transition duration-100 ease-in-out"
                     >
                        <FaX />
                     </button>
                  </div>

                  <div className="flex justify-center items-center self-center">
                     {!hasSelectedImage && (
                        <div className="flex justify-center items-center gap-2 bg-gray-500 rounded-md w-50 h-50 self-center">
                           <FaFileImage
                              className="text-white"
                              style={{ fontSize: "2em" }}
                           />
                        </div>
                     )}

                     <input
                        className="absolute opacity-0 w-60 h-50 cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                           if (e.target.files && e.target.files[0]) {
                              fileToBase64(e);
                           }
                           setHasSelectedImage(true);
                        }}
                        name="itemImage"
                        id="imageInput"
                        aria-label="Imagem do item"
                     />
                     {imageBase64 && hasSelectedImage && (
                        <Image
                           src={imageBase64}
                           alt="Pré-visualização da imagem"
                           className="self-center rounded-md object-cover"
                           width={300}
                           height={300}
                        />
                     )}
                  </div>
               </div>

               <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  aria-label="Descrição"
                  aria-required={true}
                  className={`border required-input ${
                     descriptionError ? "not-inputted" : ""
                  } rounded-md p-2`}
                  value={description}
                  placeholder="Descrição"
               />

               <div
                  className="flex flex-col gap-1 border rounded-md p-2"
                  style={{
                     borderColor: "var(--light-foreground)",
                  }}
               >
                  <p className="text-semibold text-neutral-500">
                     Etiquetas (opcional)
                  </p>

                  <div className="flex items-center justify-between gap-2 w-1/1">
                     <input
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) =>
                           e.key === "Enter" && (e.preventDefault(), addTag(e))
                        }
                        type="text"
                        className="border rounded-md p-2 min-w-6/10 sm:min-w-73/100"
                        style={{
                           borderColor: "var(--light-foreground)",
                        }}
                        value={tagInput}
                        placeholder="Etiqueta"
                     />

                     <input
                        onChange={(e) => {
                           setTagBgColor(e.target.value);
                           tagText(e.target.value);
                        }}
                        value={tagBgColor}
                        aria-label="Escolher cor da etiqueta"
                        className="w-full"
                        type="color"
                     />

                     <button
                        onClick={addTag}
                        aria-label="Adicionar etiqueta."
                        className="cursor-pointer p-2.5 rounded-md bg-emerald-600 text-white
                                   hover:bg-emerald-700 active:bg-emerald-800 transition duration-75 ease-in-out"
                     >
                        <FaTag />
                     </button>
                  </div>

                  <div className="flex items-center flex-wrap gap-2">
                     {itemTags.map((t) => (
                        <TagComponent
                           key={t.id}
                           id={t.id}
                           name={t.name}
                           bgColor={t.bgColor}
                           textColor={t.textColor}
                           removeTag={filterTag}
                        />
                     ))}
                  </div>
               </div>

               {(nameError || description) && (
                  <p className="text-sm text-rose-500">
                     Preencha todos os campos obrigatórios.
                  </p>
               )}

               <div className="flex items-center gap-2">
                  <button
                     onClick={handleSubmit}
                     type="submit"
                     className="cursor-pointer rounded-md flex items-center gap-2 py-1 px-2 text-white bg-emerald-600 border-2 border-emerald-600
                                shadow-sm hover:bg-emerald-700 hover:border-emerald-700 hover:shadow-xl transition duration-75 ease-in-out
                                 active:bg-emerald-800 active:border-emerald-800 active:shadow-md"
                  >
                     {mode === "edit" ? <FaFloppyDisk /> : <FaPlus />}
                     <span className="font-semibold">
                        {mode === "edit" ? "Salvar" : "Adicionar"}
                     </span>
                  </button>

                  <CancelBtn onClickEvent={closeForm} />
               </div>
            </form>
         </div>
      </div>
   );
};

export default AddAndEditForm;
