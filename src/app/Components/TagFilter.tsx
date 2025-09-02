import { FC } from "react";

interface TagFilterProps {
   tagNames: string[];
   selectedTags: string[];
   onCheck: (selected: string[]) => void;
}

const TagFilter: FC<TagFilterProps> = ({ tagNames, selectedTags, onCheck }) => {
   const handleCheck = (tag: string) => {
      if (selectedTags.includes(tag)) {
         onCheck(selectedTags.filter((t) => t !== tag));
      } else {
         onCheck([...selectedTags, tag]);
      }
   };
   return (
      <div>
         <div className="flex flex-wrap gap-1">
            <span>Etiquetas:</span>
            {tagNames.map((t) => (
               <label key={t} htmlFor={t}>
                  <input
                     onChange={() => handleCheck(t)}
                     checked={selectedTags.includes(t)}
                     type="checkbox"
                     id={t}
                  />
                  &nbsp;{t}
               </label>
            ))}
         </div>
      </div>
   );
};
export default TagFilter;
