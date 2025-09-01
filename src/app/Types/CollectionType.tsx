import Item from "./ItemType";

interface Collection {
   id: string;
   title: string;
   description: string;
   dateCreated: string;
   image?: string;
   items: Item[];
}

export default Collection;
