import React from 'react'
import Galaxy from '../Galaxy/Galaxy.jsx'

const GameLayout = ({children}: {children: React.ReactNode}) => {
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
      >{children}
      </Galaxy>
      </div>
  )
}

export default GameLayout