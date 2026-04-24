import {useDraggable} from '@dnd-kit/react';
import { useStore } from '../../../store.ts';

const Draggable = ({id}: {id: string}) => {
     const timer = useStore((state) => state.timer)
     console.log(timer)
     const { ref } = useDraggable({
    id,
    type: "letter", // ✅ IMPORTANT
    disabled: timer,
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