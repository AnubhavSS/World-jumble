import {useDroppable} from '@dnd-kit/react';

const Droppable = ({id,children,}) => {

  
 const { ref, isDropTarget } = useDroppable({
    id,
    type: "slot",
    accept: "letter", // ✅ MUST match draggable
  })
 return (
 <div
      ref={ref}
      className={`w-14 h-14 border-dashed border-white rounded-full flex items-center justify-center 
      border text-purple-300 text-lg font-semibold
      ${isDropTarget ? "bg-purple-500/30" : "bg-black/60"}`}
    >
      {children}
    </div>
        )
}

export default Droppable