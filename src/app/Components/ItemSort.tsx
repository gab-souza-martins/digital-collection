interface ItemSortProps {
   onAlphabeticalSort: (isAlphabetical: boolean) => void;
}

const ItemSort: React.FC<ItemSortProps> = ({ onAlphabeticalSort }) => {
   const handleAlphabeticalSort = (isOn: boolean) => {
      onAlphabeticalSort(isOn);
   };

   return (
      <div>
         <label htmlFor="alphabeticalSort">Alfabético</label>
         <input
            onChange={(e) => {
               handleAlphabeticalSort(e.target.checked);
            }}
            type="checkbox"
            id="alphabeticalSort"
         />
      </div>
   );
};

export default ItemSort;
