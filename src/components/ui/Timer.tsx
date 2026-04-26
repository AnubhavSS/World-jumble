import React, { useState, useEffect } from 'react'
import Counter from '../Counter/Counter.jsx';
import { useStore } from '../../../store.ts';
import GradientText from '../GradientText/GradientText.jsx';
import StarBorder from '../StarBorder/StarBorder.jsx';


const Timer = () => {
  const {setTimeUp, isCorrect, level} = useStore()
  
  const [time, setTime] = useState(60)


// ⏱️ ticking
useEffect(() => {
  if (isCorrect || time === 0) return

  const timer = setInterval(() => {
    setTime((prev) => Math.max(prev - 1, 0))
  }, 1000)

  return () => clearInterval(timer)
}, [isCorrect, time])

// ⛔ timeout trigger (no local state)
useEffect(() => {
  if (time === 0) {
    setTimeUp(true)
  }
}, [time, setTimeUp])

useEffect(() => {
  setTime(60)
}, [level])

  return (
    <StarBorder
  as="button"
  thickness={4}
  color="magenta"
  speed="3s"
  className=" flex items-center justify-center 
             bg-transparent"
>
  <div className="flex flex-col bg-transparent items-center justify-center">
    
    <Counter
      value={time}
      places={[10, 1]}
      fontSize={80}
      padding={2}
      gap={4}
      textColor="white"
      fontWeight={900}
      digitPlaceHolders={false}
    />

    <GradientText
      colors={["#5227FF", "#FF9FFC", "#B497CF"]}
      animationSpeed={3}
      showBorder={false}
      className="text-sm font-bold mt-1"
    >
      Seconds Remaining
    </GradientText>

  </div>
</StarBorder>
  )
}

export default Timer