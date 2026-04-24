import { useState, useMemo } from "react";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard.jsx";
import { DragDropProvider } from "@dnd-kit/react";
import Droppable from "../components/jumble/Droppable.js";
import Draggable from "../components/jumble/Draggable.js";
import SplitText from "../components/SplitText/SplitText.jsx";
import Timer from "../components/ui/Timer.jsx";
import GameLayout from "../components/layouts/GameLayout.tsx";

const Game = () => {
  
      const [slots, setSlots] = useState(["", "", "", ""])
  const [letters, setLetters] = useState(["M", "E", "H", "O"])
  const answer = "HOME".split("")

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
  
const isCorrect = useMemo(() => {
  return validation.every((valid) => valid)
}, [validation])

  return (
<GameLayout>
  <div className="w-full absolute min-h-screen flex items-center justify-center bg-transparent px-4">
    
    <div className="flex bg-transparent flex-col items-center gap-7 w-full max-w-2xl">
      
      {/* ✅ TIMER OUTSIDE */}
      <Timer />

      {/* ✅ ONLY wrap drag/drop area */}
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
              text="Well done! On to the next word!"
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

    </div>

  </div>
</GameLayout>

  );
};

export default Game;
