import React, { useState, useEffect } from 'react'
import Counter from '../Counter/Counter.jsx';
import { useStore } from '../../../store.ts';


const Timer = () => {
  
    const {timeUp} = useStore()
    const [time, setTime] = useState<number>(60);
 // ⏱️ ticking
useEffect(() => {
  const timer = setInterval(() => {
    setTime((prev) => Math.max(prev - 1, 0))
  }, 1000)

  return () => clearInterval(timer)
}, [])

// ⛔ trigger when finished
useEffect(() => {
  if (time === 0) {
    timeUp()
  }
}, [time, timeUp])

  return (
    <div className=" bg-transparent flex flex-col items-center justify-center gap-2 ">
        <Counter
  value={time}
  places={[ 10, 1]}
  fontSize={80}
  padding={5}
  gap={10}
  textColor="white"
  fontWeight={900}
  digitPlaceHolders={false}
/>
<p>Seconds remaining</p>
    </div>
  )
}

export default Timer