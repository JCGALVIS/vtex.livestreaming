import React, { Fragment } from 'react'

import Rocket from './Rocket/index'
import Burst from './Burst/index'
import Emoji from './Emoji/index'

interface Props {
  canvas: React.RefObject<HTMLCanvasElement> | null
  message: string
  animation: string
  forceMobile?: boolean
  preview?: boolean
}

const Animations: React.FC<Props> = ({
  canvas,
  animation,
  message,
  forceMobile = false,
  preview = false,
}) => {
  const render = () => {
    switch (animation) {
      case 'type1':
        return <Rocket canvas={canvas} message={message} />

      case 'type2':
        return (
          <Burst
            canvas={canvas}
            message={message}
            forceMobile={forceMobile}
            preview={preview}
          />
        )

      case 'type3':
        return <Emoji canvas={canvas} message={message} />

      default:
        return <Rocket canvas={canvas} message={message} />
    }
  }

  return <Fragment>{render()}</Fragment>
}

export default Animations
