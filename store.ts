import {create} from "zustand"

type Store = {
  timer: boolean
  timeUp: () => void
}

export const useStore = create<Store>((set) => ({
  timer: false,
  timeUp: () =>
    set((state) => ({
      timer: !state.timer,
    })),
}))
