import GameContent from "../components/GameContent.tsx";
import BlurText from "../components/BlurText/BlurText.jsx";
import MagicRings from "../components/MagicRings/MagicRings.jsx";
import CountUp from "../components/CountUp/CountUp.jsx";
import Timer from "../components/ui/Timer.jsx";
import GameLayout from "../components/layouts/GameLayout.tsx";
import { useStore, useScoreStore } from "../../store.ts";

import { useEffect, useRef } from "react";

const Game = () => {
  const { isCorrect, timeUp, level, nextLevel } = useStore();
  const { score } = useScoreStore();
const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
  if (isCorrect || timeUp) {
    if (timeoutRef.current !== null) return;

    timeoutRef.current = setTimeout(() => {
      if (level < 3) {
        nextLevel();
      }
    }, 3000);
  }

  return () => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };
}, [isCorrect, timeUp, level, nextLevel]);

  return (
    <GameLayout>
      <div className="w-full absolute min-h-screen flex flex-col items-center justify-center bg-transparent px-4">
        {level < 3 ? (
          <>
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
              <GameContent level={level} key={level} />
            </div>{" "}
          </>
        ) : (
         <div className="relative w-[600px] h-[400px] flex items-center justify-center">
  
  {/* Background rings */}
  <MagicRings
    color="#A855F7"
    colorTwo="#6366F1"
    ringCount={6}
    speed={1}
    attenuation={10}
    lineThickness={2}
    baseRadius={0.35}
    radiusStep={0.1}
    scaleRate={0.1}
    opacity={1}
    blur={0}
    noiseAmount={0.1}
    rotation={0}
    ringGap={1.5}
    fadeIn={0.7}
    fadeOut={0.5}
    followMouse={false}
    mouseInfluence={0.2}
    hoverScale={1.2}
    parallax={0.05}
    clickBurst={false}
  />

  {/* Overlay content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
    
    <h2 className="text-3xl md:text-5xl font-bold mb-2 text-white">
      You scored
    </h2>

    <CountUp
      from={0}
      to={score}
      separator=","
      direction="up"
      duration={1}
      className="text-5xl md:text-7xl font-bold text-white"
      delay={0}
    />

  </div>
</div>
        )}
      </div>
    </GameLayout>
  );
};

export default Game;
