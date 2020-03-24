# use-progress-bar

Hook to use progress bar in React

## Demo

[Open in CodeSandbox](https://codesandbox.io/s/use-progress-bar-demo-pujdw?fontsize=14)

<p align="center">
  <img width="700" align="center" src="https://user-images.githubusercontent.com/2435004/65696544-12f61c00-e082-11e9-93fe-572ef0d131d0.gif" alt="demo"/>
</p>

## Installation

```bash
$ yarn add use-progress-bar
```

## Usage

```js
import React from 'react'
import { useProgressBar } from 'use-progress-bar'

const ProgressBar = ({ isLoading }) => {
  const { status, progress } = useProgressBar(isLoading)

  const style = {
    opacity: status !== 'progress' ? 0 : 1,
    top: 0,
    position: 'absolute',
    left: 0,
    display: 'block',
    background: '#29d',
    width: `${progress}%`,
    height: '4px',
    transition: `width 200ms ease-in, opacity 200ms ease-in 200ms`,
    zIndex: 10,
  }

  return <div style={style} />
}
```

### `useProgressBar()`

```js
useProgressBar(isLoading: boolean, options?: Options): ProgressBar
```

#### ProgressBar

- `status: 'idle' | 'progress' | 'completed'`
- `progress: number`

#### Options

- `duration?: number`
  - Default: `11000` ms
  - Progress time to the max
- `frequency?: number`
  - Default: `200` ms
  - Frequency of progress updates
- `max?: number`
  - Default: `80`
  - Maximum progress until completion
