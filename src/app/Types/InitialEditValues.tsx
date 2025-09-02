import Tag from "./TagType";

interface InitialEditValues {
   title: string;
   description: string;
   tags: Tag[];
   image?: string;
}

export default InitialEditValues;
