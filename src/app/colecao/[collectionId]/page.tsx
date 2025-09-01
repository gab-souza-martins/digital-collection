"use client";
import { useParams } from "next/navigation";

const Collection = () => {
   const params = useParams();
   const { collectionId } = params;

   return (
      <div>
         <h1>{collectionId}</h1>
      </div>
   );
};

export default Collection;
