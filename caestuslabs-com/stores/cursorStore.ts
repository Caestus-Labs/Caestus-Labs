import { create } from 'zustand'

interface CursorStore {
  x: number
  y: number
  smoothX: number
  smoothY: number
  setPosition: (x: number, y: number) => void
  updateSmooth: (delta: number) => void
}

export const useCursorStore = create<CursorStore>((set, get) => ({
  x: 0,
  y: 0,
  smoothX: 0,
  smoothY: 0,
  setPosition: (x: number, y: number) => set({ x, y }),
  updateSmooth: (delta: number) => {
    const { x, y, smoothX, smoothY } = get()
    const k = 1 - Math.exp(-6 * delta) // Damping factor
    set({
      smoothX: smoothX + (x - smoothX) * k,
      smoothY: smoothY + (y - smoothY) * k,
    })
  },
}))