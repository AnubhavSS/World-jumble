;
import BorderGlow from './BorderGlow/BorderGlow.jsx'
import Shuffle from './Shuffle/Shuffle.jsx'
import StarBorder from './StarBorder/StarBorder.jsx'
import { useLocation } from 'wouter'
import { useEffect } from 'react'
import { fetchWords } from '../services.js'
import { useWordsStore } from '../../store.ts'
import Modal from './Modal.tsx'



const HomeCard = () => {
// const { setWords } = useWordsStore();

// useEffect(() => {
//   const main = async () => {
//     const data = await fetchWords(); // or selected difficulty
//     // setWords(JSON.parse(data));
//     console.log(data);
//   };

//   main();
// }, []);

    const [_, setLocation] = useLocation()

const handleClick = () => {
  setLocation("/game")
}
  return (
    
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
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
        <div className="w-[90vw] lg:w-[40vw] p-8 text-center text-white ">
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
  loop={true}
  loopDelay={3}
  className="text-sm sm:text-lg"
  
  
/>
          
          <p className="text-sm text-gray-300 leading-6">
            Unscramble the chaos. Find the word.
          </p>

          <Modal /> 
      
        </div>

      </BorderGlow>

    </div>
  )
}

export default HomeCard