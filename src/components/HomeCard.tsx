import React from 'react'
import BorderGlow from './BorderGlow/BorderGlow.jsx'
import Shuffle from './Shuffle/Shuffle.jsx'
import {GlowButton} from './ui/GlowButton.js'
import { useLocation } from 'wouter'

const HomeCard = () => {

    const [_, setLocation] = useLocation()

const handleClick = () => {
  setLocation("/game")
}
  return (
    
    <div className="absolute inset-0 flex items-center justify-center">
            <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="#120F178D"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={true}
        colors={["#c084fc", "#f472b6", "#38bdf8"]}
      >
        {/* CARD */}
        <div className="w-[35vw] p-8 text-center text-white">
          <Shuffle
  text="Jumble Words"
  shuffleDirection="up"
  duration={0.35}
  animationMode="evenodd"
  shuffleTimes={2}
  ease="back.out(1.1)"
  stagger={0.03}
  threshold={0.1}
  triggerOnce={true}
  triggerOnHover
  respectReducedMotion={true}
  loop={false}
  loopDelay={0}
  className="tracking-wider"
  
/>
          
          <p className="text-sm text-gray-300 leading-6">
            Unscramble the chaos. Find the word.
          </p>

         <GlowButton onClick={handleClick}>
  Start Game
</GlowButton>
        </div>

      </BorderGlow>

    </div>
  )
}

export default HomeCard