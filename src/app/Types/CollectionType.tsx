import Tag from "./TagType";

interface Collection {
   id: string;
   title: string;
   description: string;
   dateCreated: string;
   image?: string;
   tags: Tag[];
}

export default Collection;
