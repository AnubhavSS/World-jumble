import {useDroppable} from '@dnd-kit/react';
import ElectricBorder from "../ElectricBorder/ElectricBorder.jsx";

const Droppable = ({id,children,valid}:{id:string,children:React.ReactNode,valid:boolean}) => {

  
 const { ref, isDropTarget } = useDroppable({
    id,
    type: "slot",
    accept: "letter", // ✅ MUST match draggable
  })



 const content = (
  <div
    ref={ref}
    className={`w-14 h-14 border-dashed border-white rounded-full flex items-center justify-center 
    border text-purple-300 text-lg font-semibold
    ${isDropTarget ? "bg-purple-500/30" : "bg-black/60"}`}
  >
    {children}
  </div>
)

return valid ? (
  <ElectricBorder
    color="#9D4EDD"
    speed={0.1}
    chaos={0.07}
    thickness={2
      
    }
    style={{ borderRadius: 16 }}
  >
    {content}
  </ElectricBorder>
) : (
  content
)
}

export default Droppable