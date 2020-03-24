import React from 'react'

export interface ProgressBar {
  readonly status: 'idle' | 'progress' | 'completed'
  readonly progress: number
}

export interface Options {
  readonly frequency?: number
  readonly max?: number
  readonly duration?: number
}

export interface State {
  readonly status: 'idle' | 'progress' | 'completed'
  readonly x: number
  readonly progress: number
}

export type Action =
  | { type: 'increment'; increment: number; max: number }
  | { type: 'complete' }
  | { type: 'reset' }

const IDLE = 'idle'
const PROGRESS = 'progress'
const COMPLETED = 'completed'

const MAX_X = 60

const DEFAULT_FREQUENCY = 200 // ms
const DEFAULT_MAX = 80
const DEFAULT_DURATION = 11000 // 11 sec

const initialState: State = { status: IDLE, x: 0, progress: 0 }
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment': {
      const { increment, max } = action
      const x = state.x + increment
      const progress =
        Math.round((1 - Math.exp((-1 * x) / 10)) * 100 * max) / 100

      return {
        status: PROGRESS,
        x,
        progress: Math.max(progress, state.progress),
      }
    }
    case 'complete':
      return {
        ...state,
        status: COMPLETED,
        progress: 100,
      }
    case 'reset':
      return initialState
    default:
      throw new Error('Unknown action')
  }
}

export const useProgressBar = (
  isLoading: boolean,
  {
    frequency = DEFAULT_FREQUENCY,
    max = DEFAULT_MAX,
    duration = DEFAULT_DURATION,
  }: Options = {},
): ProgressBar => {
  const [{ x, progress, status }, dispatch] = React.useReducer(
    reducer,
    initialState,
  )

  React.useEffect(
    () => dispatch(!isLoading ? { type: 'complete' } : { type: 'reset' }),
    [isLoading],
  )

  React.useEffect(() => {
    if (!isLoading || x > MAX_X) {
      return
    }

    const increment = MAX_X / (duration / frequency)
    const id = setTimeout(
      () => dispatch({ type: 'increment', increment, max }),
      frequency,
    )

    return () => clearTimeout(id)
  }, [isLoading, x])

  return { status, progress }
}
