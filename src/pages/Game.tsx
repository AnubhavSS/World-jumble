import React, { useState } from "react";
import SpotlightCard from "../components/SpotlightCard/SpotlightCard.jsx";
import { DragDropProvider } from "@dnd-kit/react";
import Droppable from "../components/jumble/Droppable.js";
import Draggable from "../components/jumble/Draggable.js";
import { move } from "@dnd-kit/helpers";
import { dropOrSwap } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";

const Game = () => {
  
  

    const [slots, setSlots] = useState(["", "", "", ""])
  const [letters, setLetters] = useState(["U", "B", "A", "L"])

  const handleDragEnd = (event: any) => {
    if (event.canceled) return

        const sourceId = event.operation.source?.id
        const targetId = event.operation.target?.id

        if (!targetId || !sourceId) return

        const index = parseInt(targetId.split("-")[1])

        // prevent overwrite
        if (slots[index]) return

        const newSlots = [...slots]
        newSlots[index] = sourceId

        setSlots(newSlots)
        setLetters((prev) => prev.filter((l) => l !== sourceId))
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0b0f1a] px-4">
      <SpotlightCard
        className="w-full max-w-2xl rounded-3xl p-6 sm:p-10 backdrop-blur-xl bg-white/5 border border-white/10"
        spotlightColor="rgba(157, 78, 221, 0.2)"
      >
        {/* WORD SLOTS */}
        <div className="flex justify-center gap-3 mb-8">
            {slots.map((letter, i) => (
              <Droppable key={i} id={`slot-${i}`}>
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

        
      </SpotlightCard>
    </div>
    </DragDropProvider>
  );
};

export default Game;
