import Tag from "./TagType";

interface Item {
   id: string;
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
   tags: Tag[];
}
export default Item;
