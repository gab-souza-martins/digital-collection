import Tag from "./TagType";

interface Card {
   id: string;
   title: string;
   description: string;
   dateAdded: string;
   image?: string;
   isFav: boolean;
   tags: Tag[];
}
export default Card;
