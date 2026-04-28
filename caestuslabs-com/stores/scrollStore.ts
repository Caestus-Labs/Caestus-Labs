import { create } from 'zustand'

interface ScrollStore {
  progress: number
  stage: number
  setProgress: (progress: number) => void
  getStageProgress: (stage: number) => number
}

export const useScrollStore = create<ScrollStore>((set, get) => ({
  progress: 0,
  stage: 1,
  setProgress: (progress: number) => {
    const stage = progress < 0.33 ? 1 : progress < 0.66 ? 2 : 3
    set({ progress, stage })
  },
  getStageProgress: (stage: number) => {
    const { progress } = get()
    if (stage === 1) {
      return Math.min(1, progress * 3)
    } else if (stage === 2) {
      return Math.max(0, Math.min(1, (progress - 0.33) * 3))
    } else {
      return Math.max(0, Math.min(1, (progress - 0.66) * 3))
    }
  },
}))