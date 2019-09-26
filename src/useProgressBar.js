// @flow
import * as React from 'react'

import type { ProgressBar, Options, State, Action } from './types.js.flow'

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

      return {
        status: PROGRESS,
        x,
        progress: Math.round((1 - Math.exp((-1 * x) / 10)) * 100 * max) / 100,
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

const useProgressBar = (
  isLoading: boolean,
  {
    frequency = DEFAULT_FREQUENCY,
    max = DEFAULT_MAX,
    duration = DEFAULT_DURATION,
  }: Options = {},
): ProgressBar => {
  const [{ x, progress, status }, dispatch] = React.useReducer<State, Action>(
    reducer,
    initialState,
  )

  React.useEffect(() => {
    if (!isLoading) {
      dispatch({ type: 'complete' })
      return
    }

    dispatch({ type: 'reset' })
  }, [isLoading])

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

export default useProgressBar
