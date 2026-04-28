import  { useState, useEffect } from 'react'

import { useStore, useScoreStore } from '../../../store.ts';

import {words} from '../../../data.js';
import CircularProgressBar from '../CircularProgressBar/CircularProgressBar.tsx';



const Timer = () => {
  const {setTimeUp, isCorrect, level} = useStore()
  const {addScore, resetStreak, incrementStreak, streak} = useScoreStore()
  
  const [time, setTime] = useState(60)

  useEffect(() => {
  if (isCorrect) {
    const base = words[level]?.answer?.length * 10
    const timeBonus = time * 2
    const multiplier = Math.min(1 + streak * 0.2, 2)

    const total = Math.floor((base + timeBonus) * multiplier)

    addScore(total)
    incrementStreak()
  }

  if (time === 0) {
    resetStreak()
  }
}, [isCorrect, time])


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
   
  <div className="flex flex-col bg-transparent items-center justify-center">

    <CircularProgressBar />
    
    {/* <Counter
      value={time}
      places={[10, 1]}
      fontSize={80}
      padding={2}
      gap={4}
      textColor="white"
      fontWeight={900}
      digitPlaceHolders={false}
    /> */}


  </div>

  )
}

export default Timer