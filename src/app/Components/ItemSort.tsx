import React from "react";

interface ItemSortProps {
   onDateSort: (isByDate: boolean) => void;
   onReverseDateSort: (isByReverseDate: boolean) => void;
   onAlphabeticalSort: (isAlphabetical: boolean) => void;
   onReverseAlphabeticalSort: (isReverseAlphabetical: boolean) => void;
}

const ItemSort: React.FC<ItemSortProps> = ({
   onDateSort,
   onReverseDateSort,
   onAlphabeticalSort,
   onReverseAlphabeticalSort,
}) => {
   //    const handleDateSort = (isOn: boolean) => {
   //       onDateSort(isOn);
   //    };
   //    const handleReverseDateSort = (isOn: boolean) => {
   //       onReverseDateSort(isOn);
   //    };
   //    const handleAlphabeticalSort = (isOn: boolean) => {
   //       onAlphabeticalSort(isOn);
   //    };
   //    const handleReverseAlphabeticalSort = (isOn: boolean) => {
   //       onReverseAlphabeticalSort(isOn);
   //    };

   const [selectedSort, setSelectedSort] = React.useState<string>("");

   return (
      <div className="flex gap-2">
         <label htmlFor="sortSelect">Ordenar por:</label>
         <select
            id="sortSelect"
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
            className="border border-gray-600/50 rounded-md py-1 px-2"
         >
            <option value="date">primeiro adicionado</option>
            <option value="date-reverse">último adicionado</option>
            <option value="alphabetical">título (A–Z)</option>
            <option value="alphabetical-reverse">título (Z–A)</option>
         </select>
      </div>
   );
};

export default ItemSort;
