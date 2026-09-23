"use client"

import { createContext, useContext } from "react"

/** Shared by Stage and the dynamically loaded canvas so a function never
    crosses the `next/dynamic` client-entry boundary. */
export const SceneReadyContext = createContext<(() => void) | null>(null)

export function useSceneReady() {
  return useContext(SceneReadyContext)
}
