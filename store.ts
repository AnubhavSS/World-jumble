import {create} from "zustand"

type Store = {
  level: number
  isCorrect: boolean
  timeUp: boolean

  nextLevel: () => void
  setIsCorrect: (value: boolean) => void
  setTimeUp: (value: boolean) => void
}

export const useStore = create<Store>((set) => ({
  level: 0,
  isCorrect: false,
  timeUp: false,

  nextLevel: () => set((s) => ({
    level: s.level + 1,
    isCorrect: false,
    timeUp: false,
  })),

  setIsCorrect: (value) => set({ isCorrect: value }),
  setTimeUp: (value) => set({ timeUp: value }),
}))


type Score={
score: number
  streak: number
  addScore: (points: number) => void
  resetStreak: () => void
  incrementStreak: () => void
}

export const useScoreStore = create<Score>((set) => ({
  score: 0,
  streak: 0,

  addScore: (points) =>
    set((s) => ({ score: s.score + points })),

  incrementStreak: () =>
    set((s) => ({ streak: s.streak + 1 })),

  resetStreak: () => set({ streak: 0 }),
}))


type Words = {
  words: { answer: string, letters: string[], difficulty: string }[]
  setWords: (words: { answer: string, letters: string[], difficulty: string }[]) => void
  difficulty: string 
  setDifficulty: (value: string) => void
}

export const useWordsStore = create<Words>((set) => ({
 words: [],
  setWords: (words) => set({ words }),
 difficulty: "Easy",
 setDifficulty: (value) => set({ difficulty: value }),
}))