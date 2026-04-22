import React from 'react'
import Galaxy from '../components/Galaxy/Galaxy.jsx'
import BorderGlow from '../components/BorderGlow/BorderGlow.jsx'
import Shuffle from '../components/Shuffle/Shuffle.jsx'
import {GlowButton} from '../components/ui/GlowButton.jsx'

const Home = () => {
  return (
 <div className="relative w-full h-screen">
  <Galaxy
    mouseRepulsion={false}
    mouseInteraction
    density={1}
    glowIntensity={0.4}
    saturation={0}
    hueShift={140}
    twinkleIntensity={0.3}
    rotationSpeed={0.1}
    repulsionStrength={2}
    autoCenterRepulsion={0}
    starSpeed={0.4}
    speed={0.4}
  >
    {/* CENTER LAYER */}
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
          
          <p className="text-sm text-gray-300">
            Unscramble the chaos. Find the word.
          </p>

         <GlowButton>
  Start Game
</GlowButton>
        </div>

      </BorderGlow>

    </div>
  </Galaxy>
</div>
  )
}

export default Home