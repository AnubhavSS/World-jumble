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
