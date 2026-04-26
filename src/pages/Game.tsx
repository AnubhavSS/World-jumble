import GameContent from "../components/GameContent.tsx";
import BlurText from "../components/BlurText/BlurText.jsx";
import PixelTransition from "../components/PixelTransition/PixelTransition.jsx";
import Timer from "../components/ui/Timer.jsx";
import GameLayout from "../components/layouts/GameLayout.tsx";
import { useStore } from "../../store.ts";

import { useEffect, useRef } from "react";

const Game = () => {
  const { isCorrect, timeUp, level, nextLevel } = useStore();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isCorrect || timeUp) {
      // prevent multiple scheduling
      if (timeoutRef.current) return;

      timeoutRef.current = setTimeout(() => {
        nextLevel();
        timeoutRef.current = null;
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isCorrect, timeUp, nextLevel]);

  console.log(level);

  return (
    <GameLayout>
      <div className="w-full absolute min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
        <BlurText
          text={`Level ${level + 1}`}
          delay={200}
          animateBy="letters"
          direction="top"
          className="text-xl md:text-5xl text-center font-bold mb-8"
        />

        <div className="flex bg-transparent flex-col items-center gap-7 w-full max-w-2xl">
          {/* ✅ TIMER OUTSIDE */}
          <Timer />

          {/* ✅ GAME CONTENT */}
          <PixelTransition
            firstContent={<GameContent level={level} key={level} />}
            secondContent={<GameContent level={level + 1} key={level + 1} />}
            gridSize={10}
            pixelColor="#ffffff"
           
            animationStepDuration={0.4}
            className="w-full h-full"
          />
        </div>
      </div>
    </GameLayout>
  );
};

export default Game;
