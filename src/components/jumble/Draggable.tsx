import {useDraggable} from '@dnd-kit/react';

const Draggable = ({id}: {id: string}) => {

     const { ref } = useDraggable({
    id,
    type: "letter", // ✅ IMPORTANT
  })

  return (
    <div
      ref={ref}
      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center 
      bg-black/60 border border-gray-400/30 text-white text-xl font-bold cursor-pointer"
    >
      {id}
    </div>
  )
}

export default Draggable