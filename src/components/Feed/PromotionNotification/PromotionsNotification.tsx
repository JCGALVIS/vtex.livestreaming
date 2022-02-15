import React, { useEffect, useState } from 'react'
import gsap, { Expo, Elastic } from 'gsap'
import confetti from 'canvas-confetti'

import style from './PromotionsNotification.css'
import BorderPromo from '../../icons/BorderPromo'

interface Props {
  canvas: React.RefObject<HTMLCanvasElement> | null
  message: string
}
const PromotionsNotification: React.FC<Props> = ({ canvas, message }) => {
  const [showMessage, setShowMessage] = useState<boolean>(false)

  const completeAnimation = () => {
    setShowMessage(true)
  }

  useEffect(() => {
    if (!canvas) return
    setTimeout(() => {
      const tl = gsap.timeline({
        repeat: 0,
        repeatDelay: 0,
        onComplete: completeAnimation,
        onStart: () => {
          setShowMessage(false)
        }
      })
      tl.from('.cloud', 1, { alpha: 0 })
        .to('#rocketwrapper', 3, {
          y: -400,
          ease: Expo.easeIn
        })
        .to('.cloud', 3, { attr: { cy: 185 }, ease: Expo.easeIn }, '-=3')
        .set('.cloud', {
          clearProps: 'all'
        })
        .to('.cloud', 1, {
          display: 'none'
        })
        .to('#rocketwrapper', 1, {
          display: 'none'
        })
        .set('#rocketwrapper', { y: 250 })
        .to('#rocketwrapper', 1, {
          y: 250,
          ease: Elastic.easeOut.config(0.5, 0.4)
        })
        .to(
          style.trailwrapper,
          2.5,
          { scaleX: 0.5, scaleY: 0, alpha: 0, ease: Expo.easeOut },
          '-=2.0'
        )
    }, 5000)
  }, [canvas])

  useEffect(() => {
    if (!canvas?.current) return
    if (!showMessage) return
    const party = confetti.create(canvas.current, { resize: true })
    // go Buckeyes!
    const colors = ['#bb0000', '#ffffff']
    const end = Date.now() + 5 * 1000

    function frame() {
      party({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors
      })
      party({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors
      })
      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [canvas, showMessage])

  return (
    <div className={style.frame}>
      <div className={style.loader}>
        <div className={style.loaderring} />
        <BorderPromo
          style={{
            position: 'absolute',
            top: '-5px',
            left: '-5px',
            width: '125px',
            height: '125px',
            zIndex: 1
          }}
        />
        <div className={style.rocketwrapper} id='rocketwrapper'>
          <div className={style.trailwrapper}>
            <img
              src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/trail.png'
              alt=''
              className={style.trail}
            />
          </div>
          <img
            src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/small-rocket.png'
            alt=''
            className={style.rocket}
          />
        </div>

        <div className={style.cloudswrapper}>
          <div className={style.messagepromo}>
            <div>{message}</div>
          </div>

          <svg
            className={style.clouds}
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 92 90.83'
          >
            <defs>
              <clipPath id='clip-path' transform='translate(1.75)'>
                <circle cx='42.5' cy='42.5' r='42.5' fill='none' />
              </clipPath>
              <filter id='goo' colorInterpolationFilters='sRGB'>
                <feGaussianBlur
                  in='SourceGraphic'
                  stdDeviation='6'
                  result='blur'
                />
                <feColorMatrix
                  in='blur'
                  mode='matrix'
                  values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -11'
                  result='goo'
                />
                <feBlend in='SourceGraphic' in2='goo' />
              </filter>
              <filter id='blurMe'>
                <feGaussianBlur in='SourceGraphic' stdDeviation='0.9' />
              </filter>
            </defs>
            <g clipPath='url(#clip-path)' fill='#eef2f3' filter='url(#goo)'>
              <g className={style.cloudswrapper} filter='url(#blurMe)'>
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='40'
                  cy='61.83'
                  rx='7'
                  ry='7'
                />
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='81'
                  cy='68.83'
                  rx='8'
                  ry='8'
                />
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='6'
                  cy='63.83'
                  rx='6'
                  ry='6'
                />
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='15'
                  cy='70.83'
                  rx='11'
                  ry='11'
                />
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='65'
                  cy='74.83'
                  rx='11'
                  ry='11'
                />
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='48'
                  cy='71.83'
                  rx='14'
                  ry='14'
                />
                <ellipse
                  className={`${style.cloud} cloud`}
                  cx='34'
                  cy='75.83'
                  rx='16'
                  ry='16'
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default PromotionsNotification
