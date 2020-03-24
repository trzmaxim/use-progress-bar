import { reducer, State } from './useProgressBar'

const initialState: State = { status: 'idle', x: 0, progress: 0 }
test('unknown action error', () => {
  expect(() => {
    // @ts-ignore
    reducer(initialState, { type: 'unknown' })
  }).toThrow('Unknown action')
})

test('progress check', () => {
  let state = initialState
  let prevProgress = 0

  for (let i = 1; i <= 5; i++) {
    state = reducer(state, { type: 'increment', increment: 1, max: 100 })
    expect(state.status).toBe('progress')
    expect(state.progress > prevProgress).toBe(true)
    prevProgress = state.progress
  }

  state = reducer(state, { type: 'complete' })
  expect(state.status).toBe('completed')
  expect(state.progress).toBe(100)

  state = reducer(state, { type: 'reset' })
  expect(state).toEqual(initialState)
})
