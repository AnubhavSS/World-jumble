import  { useState } from 'react'
import { Dialog, DialogTrigger, DialogContent, } from './ui/dialog'
import { useWordsStore } from '../../store.ts'
import { useLocation } from 'wouter'


import StarBorder from './StarBorder/StarBorder.jsx'


const difficulties = [
  {
    level: "Easy",
    letters: "3–5 Letters",
    multiplier: "x1",
    color: "from-emerald-400 to-emerald-600",
    border: "border-emerald-400",
    glow: "shadow-emerald-500/40",
  },
  {
    level: "Medium",
    letters: "5–7 Letters",
    multiplier: "x1.5",
    color: "from-yellow-400 to-orange-500",
    border: "border-yellow-400",
    glow: "shadow-yellow-500/40",
  },
  {
    level: "Hard",
    letters: "7+ Letters",
    multiplier: "x2",
    color: "from-pink-500 to-rose-600",
    border: "border-pink-500",
    glow: "shadow-pink-500/40",
  },
];

const Modal = () => {

     const [selected, setSelected] = useState("Easy");  
     const { setDifficulty } = useWordsStore();
     const [_, setLocation] = useLocation()
      
  const handleSelect = (level:string) => {
    setSelected(level);
    setDifficulty(level);
    setTimeout(() => {
      setLocation("/game")
    }, 1000)

  };

  return (
        <Dialog>
      <DialogTrigger asChild>
        <StarBorder
  as="button"
  className="mt-4 cursor-pointer"
  color="magenta"
  speed="5s"
>
  Start Game
</StarBorder> 
      </DialogTrigger>

  {/* <DialogTitle className='text-lg text-gray-200 mb-6'>Select Difficulty</DialogTitle> */}

      <DialogContent showCloseButton={false} className="w-[90vw] sm:max-w-lg md:max-w-2xl lg:max-w-3xl rounded-full">
         <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-lg text-gray-200 mb-6">Select Difficulty</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {difficulties.map((item) => {
          const isActive = selected === item.level;

          return (
            <button
              key={item.level}
              onClick={() => handleSelect(item.level)}
              className={`
                relative p-6 border transition-all duration-300
                backdrop-blur-md bg-white/3 cursor-pointer 
                hover:scale-105 hover:shadow-lg 
                ${isActive ? `${item.border} ${item.glow} scale-105` : "border-white/10"}
              `}
            >
              {/* Glow background */}
              {isActive && (
                <div
                  className={`absolute inset-0 rounded-2xl bg-linear-to-br ${item.color} opacity-20 blur-xl`}
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-2">
                <h3
                  className={`text-xl font-semibold ${
                    isActive ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.level}
                </h3>

                <p className="text-sm text-gray-400">{item.letters}</p>

                <span
                  className={`mt-2 text-xs px-3 py-1 rounded-full bg-linear-to-r ${item.color} text-black font-medium`}
                >
                  Score {item.multiplier}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
      </DialogContent>
      
    </Dialog>
  )
}

export default Modal