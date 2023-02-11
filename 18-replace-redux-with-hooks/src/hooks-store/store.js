import { useState, useEffect } from 'react'

// those are defined outside of my hook. So there are global. there are not recreated when we call useStore.
// there are not created separately for every component that consumes my custom hook. Instead it will
// be created once when this file is first imported, basically. And there after any other file that imports
// from the same file will all use that same state.
let globalState = {}
let listeners = []
let actions = {}

export const useStore = () => {
  const setState = useState(globalState)[1]

  const dispatch = (actionIdentifier, payload) => {
    console.log()
    const newState = actions[actionIdentifier](globalState, payload)
    globalState = { ...globalState, ...newState }

    for (const listener of listeners) {
      listener(globalState)
    }
  }

  useEffect(() => {
    listeners.push(setState)

    return () => {
      listeners = listeners.filter((li) => li !== setState)
    }
  }, [setState])

  return [globalState, dispatch]
}

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState }
  }
  actions = { ...actions, ...userActions }
}
