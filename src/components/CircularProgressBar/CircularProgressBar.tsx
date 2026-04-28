import  { useEffect, useState,  useId } from 'react'
import Counter from '../Counter/Counter.jsx';
import './CircularProgressBar.css'
import { useStore } from "../../../store.js";



const 
CircularProgressBar = ({ strokeWidth = 10, sqSize = 200,}) => {

   const { isCorrect} = useStore()

  const [percentage, setPercentage] = useState(100)
  const [duration, setDuration] = useState(60)
 useEffect(() => {
  const interval = setInterval(() => {
    setPercentage((prev) => Math.max(prev - 100 / duration, 0));
  }, 1000);

  return () => clearInterval(interval);
}, [duration]);

 useEffect(() => {
  if (percentage <= 0 || isCorrect) {
    const timeout = setTimeout(() => {
      setDuration(60);
      setPercentage(100);
    }, 3000);

    return () => clearTimeout(timeout);
  }
}, [percentage, isCorrect]);

  const radius = (sqSize - strokeWidth) / 2
  // const viewBox = `0 0 ${sqSize} ${sqSize}`
    const circumference = 2 * Math.PI * radius;
 const remainingTime = Math.ceil((duration * percentage) / 100) // Calculate remaining time
  const progress = remainingTime / duration;
  const dashOffset = circumference * (1 - progress);

  
   const gradientId = useId()
  const glowId = useId()

  return (
   <div className="relative" style={{ width: sqSize, height: sqSize }}>
      <svg width={sqSize} height={sqSize}>
        <defs>
          {/* Gradient */}
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
           
              <>
                <stop offset="0%" stopColor="#C77DFF" />
                <stop offset="100%" stopColor="#9D4EDD" />
              </>
          
          </linearGradient>

          {/* Glow */}
          <filter id={glowId}>
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background */}
        <circle
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius+1}
          stroke="#ffffff10"
          strokeWidth={strokeWidth/2}
          fill="none"
        />

        {/* Outer Glow Layer */}
        <circle
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius+2}
          stroke={"#9D4EDD"}
          strokeWidth={strokeWidth/2 + 4}
          opacity={0.3}
          fill="none"
          filter={`url(#${glowId})`}
          className={"neon-purple"}
        />

        {/* Main Progress */}
        <circle
          cx={sqSize / 2}
          cy={sqSize / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.5s ease",
          }}
          className="neon-purple"
        />
      </svg>

      {/* Center Counter */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Counter value={remainingTime} places={[10, 1]} fontSize={80} padding={2} gap={4} textColor="white" fontWeight={900} digitPlaceHolders={false} />
      </div>
    </div>
  )
}

export default CircularProgressBar