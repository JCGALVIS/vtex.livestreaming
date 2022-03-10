import React, { Fragment, useEffect, useState } from 'react'
import { isAppleDevice } from '../../../utils/getMobileOs'

import style from './index.css'

interface Props {
  canvas: React.RefObject<HTMLCanvasElement> | null
  message: string
  forceMobile: boolean
}
const PromotionsNotification: React.FC<Props> = ({ message, forceMobile }) => {
  const [showHide, setShowHide] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const isApple = isAppleDevice()

  useEffect(() => {
    let seconds = 0
    const int = setInterval(() => {
      if (seconds === 0 || seconds === 5) {
        setShowHide(true)
      }

      if (seconds === 4 || seconds === 9) {
        setShowHide(false)
      }

      seconds++
    }, 1000)

    setTimeout(() => {
      clearInterval(int)
      setShowHide(false)
      setShowMessage(true)
    }, 10000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`${style.animation3frame} ${isApple ? style.ios : ''} ${
        forceMobile ? style.mobile : ''
      }`}
    >
      {showHide && (
        <Fragment>
          <div className={`${style.celebrationContainer} ${style.left}`}>
            <span
              role="img"
              aria-label="EMoji1"
              className={`${style.celebrationContainerEmoji} ${style.emoji1}`}
            >
              {' '}
              🎉
            </span>

            <span
              role="img"
              aria-label="EMoji3"
              className={`${style.celebrationContainerEmoji} ${style.emoji3}`}
            >
              {' '}
              👍
            </span>
            <span
              role="img"
              aria-label="EMoji4"
              className={`${style.celebrationContainerEmoji} ${style.emoji4}`}
            >
              {' '}
              ❤️
            </span>
            <span
              role="img"
              aria-label="EMoji5"
              className={`${style.celebrationContainerEmoji} ${style.emoji5}`}
            >
              {' '}
              🎉
            </span>

            <span
              role="img"
              aria-label="EMoji7"
              className={`${style.celebrationContainerEmoji} ${style.emoji7}`}
            >
              {' '}
              🎁
            </span>
          </div>
          <div className={`${style.celebrationContainer} ${style.left2}`}>
            <span
              role="img"
              aria-label="EMoji1"
              className={`${style.celebrationContainerEmoji} ${style.emoji1}`}
            >
              {' '}
              🎉
            </span>
            <span
              role="img"
              aria-label="EMoji2"
              className={`${style.celebrationContainerEmoji} ${style.emoji2}`}
            >
              🎁
            </span>
            <span
              role="img"
              aria-label="EMoji4"
              className={`${style.celebrationContainerEmoji} ${style.emoji4}`}
            >
              {' '}
              ❤️
            </span>
            <span
              role="img"
              aria-label="EMoji6"
              className={`${style.celebrationContainerEmoji} ${style.emoji6}`}
            >
              💰
            </span>
            <span
              role="img"
              aria-label="EMoji7"
              className={`${style.celebrationContainerEmoji} ${style.emoji7}`}
            >
              {' '}
              🤑
            </span>
          </div>
          {isApple && (
            <div className={`${style.celebrationContainer} ${style.left3}`}>
              <span
                role="img"
                aria-label="EMoji1"
                className={`${style.celebrationContainerEmoji} ${style.emoji1}`}
              >
                {' '}
                🎉
              </span>
              <span
                role="img"
                aria-label="EMoji2"
                className={`${style.celebrationContainerEmoji} ${style.emoji2}`}
              >
                🎁
              </span>
              <span
                role="img"
                aria-label="EMoji4"
                className={`${style.celebrationContainerEmoji} ${style.emoji4}`}
              >
                {' '}
                🎊
              </span>
              <span
                role="img"
                aria-label="EMoji6"
                className={`${style.celebrationContainerEmoji} ${style.emoji6}`}
              >
                💰
              </span>
              <span
                role="img"
                aria-label="EMoji7"
                className={`${style.celebrationContainerEmoji} ${style.emoji7}`}
              >
                {' '}
                🎀
              </span>
            </div>
          )}
          <div className={`${style.celebrationContainer} ${style.right}`}>
            <span
              role="img"
              aria-label="EMoji1"
              className={`${style.celebrationContainerEmoji} ${style.emoji1}`}
            >
              {' '}
              🎉
            </span>
            <span
              role="img"
              aria-label="EMoji2"
              className={`${style.celebrationContainerEmoji} ${style.emoji2}`}
            >
              😃
            </span>
            <span
              role="img"
              aria-label="EMoji4"
              className={`${style.celebrationContainerEmoji} ${style.emoji4}`}
            >
              {' '}
              🥳
            </span>
            <span
              role="img"
              aria-label="EMoji6"
              className={`${style.celebrationContainerEmoji} ${style.emoji6}`}
            >
              🤩
            </span>
            <span
              role="img"
              aria-label="EMoji7"
              className={`${style.celebrationContainerEmoji} ${style.emoji7}`}
            >
              {' '}
              🎉
            </span>
          </div>
          <div className={`${style.celebrationContainer} ${style.right2}`}>
            <span
              role="img"
              aria-label="EMoji1"
              className={`${style.celebrationContainerEmoji} ${style.emoji1}`}
            >
              {' '}
              🎉
            </span>
            <span
              role="img"
              aria-label="EMoji2"
              className={`${style.celebrationContainerEmoji} ${style.emoji2}`}
            >
              🎁
            </span>
            <span
              role="img"
              aria-label="EMoji4"
              className={`${style.celebrationContainerEmoji} ${style.emoji4}`}
            >
              {' '}
              😊
            </span>
            <span
              role="img"
              aria-label="EMoji6"
              className={`${style.celebrationContainerEmoji} ${style.emoji6}`}
            >
              🎈
            </span>
            <span
              role="img"
              aria-label="EMoji7"
              className={`${style.celebrationContainerEmoji} ${style.emoji7}`}
            >
              {' '}
              🎫
            </span>
          </div>
          {isApple && (
            <div className={`${style.celebrationContainer} ${style.right3}`}>
              <span
                role="img"
                aria-label="EMoji1"
                className={`${style.celebrationContainerEmoji} ${style.emoji1}`}
              >
                {' '}
                🎉
              </span>
              <span
                role="img"
                aria-label="EMoji2"
                className={`${style.celebrationContainerEmoji} ${style.emoji2}`}
              >
                🎁
              </span>
              <span
                role="img"
                aria-label="EMoji4"
                className={`${style.celebrationContainerEmoji} ${style.emoji4}`}
              >
                {' '}
                ❤️
              </span>
              <span
                role="img"
                aria-label="EMoji6"
                className={`${style.celebrationContainerEmoji} ${style.emoji6}`}
              >
                💰
              </span>
              <span
                role="img"
                aria-label="EMoji7"
                className={`${style.celebrationContainerEmoji} ${style.emoji7}`}
              >
                {' '}
                🤑
              </span>
            </div>
          )}
        </Fragment>
      )}
      {showMessage && (
        <div className={style.animationTextContainer}>
          <div className={style.burst} />
          <div className={style.animation3text}>{message}</div>
        </div>
      )}
    </div>
  )
}

export default PromotionsNotification
