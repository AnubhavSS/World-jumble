import {useState,useMemo,useEffect}  from 'react'
import { words } from "../../data.js";
import { useStore, useWordsStore } from "../../store.js";
import { DragDropProvider } from "@dnd-kit/react";
import Droppable from "../components/jumble/Droppable.tsx";
import Draggable from "../components/jumble/Draggable.tsx";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard.jsx";
import SplitText from "../components/SplitText/SplitText.jsx";


const GameContent = ({level}:{level:number}) => {
  
  const {setIsCorrect, } = useStore()
  const {difficulty} = useWordsStore()

       
      const currentWord = words?.[difficulty][level]
     
    const [slots, setSlots] = useState<string[]>(
      () => Array(currentWord.letters.length).fill("")
    )
    
    const [letters, setLetters] = useState<string[]>(
      () => currentWord.letters
    )
 
    const answer = currentWord.answer.split("")
    
      const handleDragEnd = (event: any) => {
      if (event.canceled) return
    
      const sourceId = event.operation.source?.id
      const targetId = event.operation.target?.id
    
      if (!sourceId) return
    
      // 🔁 CASE 1: Dropped outside → return to letters
      if (!targetId) {
        setSlots((prev) => {
          const newSlots = prev.map((slot) =>
            slot === sourceId ? "" : slot
          )
          return newSlots
        })
    
        setLetters((prev) =>
          prev.includes(sourceId) ? prev : [...prev, sourceId]
        )
    
        return
      }
    
      // 🎯 CASE 2: Dropped into slot
      const index = parseInt(targetId.split("-")[1])
    
      // prevent overwrite
      if (slots[index]) return
    
      setSlots((prev) => {
        const newSlots = [...prev]
    
        // remove from previous slot if exists
        const existingIndex = newSlots.findIndex(
          (slot) => slot === sourceId
        )
        if (existingIndex !== -1) {
          newSlots[existingIndex] = ""
        }
    
        newSlots[index] = sourceId
        return newSlots
      })
    
      setLetters((prev) => prev.filter((l) => l !== sourceId))
    }
    
    const validation = useMemo(() => {
      return slots.map((slot, index) => slot === answer[index])
    }, [slots, answer])
      
  // ✅ derive correctness (no state)
const isCorrect = slots.every((slot, i) => slot === answer[i])

// ✅ sync to store (side effect)
useEffect(() => {
  setIsCorrect(isCorrect)
}, [isCorrect, setIsCorrect])
  return (
   
      <DragDropProvider onDragEnd={handleDragEnd}>
        <SpotlightCard
          className="w-full rounded-3xl p-6 sm:p-10 bg-black/30 backdrop-blur-lg border border-white/10"
          spotlightColor="rgba(157, 78, 221, 0.2)"
        >
          {/* WORD SLOTS */}
          <div className="flex justify-center gap-3 mb-8">
            {slots.map((letter, i) => (
              <Droppable key={i} id={`slot-${i}`} valid={validation[i]}>
                {letter && <Draggable id={letter} />}
              </Droppable>
            ))}
          </div>

          {/* LETTER OPTIONS */}
          <div className="flex justify-center gap-4 flex-wrap">
            {letters.map((letter) => (
              <Draggable key={letter} id={letter} />
            ))}
          </div>

          {isCorrect && (
            <SplitText
              text={level < 2 ? `Well done! On to the next word!` : "You've completed all levels!"}
              className="text-2xl font-semibold text-center"
              delay={50}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="100px"
              textAlign="center"
              showCallback={false}
            />
          )}
        </SpotlightCard>
      </DragDropProvider>
  )
}

export default GameContent