import React, { useEffect, useRef, useState, Fragment } from 'react'

import styles from './productCart.css'

export const ProductCart = ({ image }: { image: string }) => {
  const [done, setDone] = useState(false)
  const [load, setLoad] = useState(false)

  const animationReqId = useRef<number>()

  const outerRef = useRef<HTMLDivElement>(null)

  const handleLoad = () => {
    setLoad(true)
  }

  useEffect(() => {
    if (!load) return () => {}

    let y = 0
    let x = 0
    let direction = 1
    let opacity = 1
    const xlimit = Math.random() * (50 - 30 + 1) + 30
    const speed = 1 + Math.random() * 2
    const xSpeed = Math.random() * (1.5 - 1 + 1) + 1

    const animate = () => {
      if (y >= -250 && y <= 0) y -= speed
      if (y >= -600 && y <= -250) y -= speed * 0.5
      if (y >= -800 && y <= -600) y -= speed * 0.8

      if (direction === 1) x -= xSpeed
      if (direction === -1) x += xSpeed

      if (Math.abs(x) > xlimit) direction *= -1

      opacity -= speed * 0.001

      if (outerRef.current) {
        outerRef.current.style.transform = `translateY(${y}px) translateX(${x}px)`
        outerRef.current.style.transition = 'transform 0.45s ease-out'
        outerRef.current.style.opacity = opacity.toString()
      }

      if (y > -400) {
        animationReqId.current = requestAnimationFrame(animate)
      } else {
        setDone(true)
      }
    }

    animationReqId.current = requestAnimationFrame(animate)

    return () => {
      if (animationReqId.current) cancelAnimationFrame(animationReqId.current)
    }
  }, [load])

  return (
    <Fragment>
      {!done && (
        <div
          ref={outerRef}
          className={`${styles.productToCartContainer} ${styles.productToCartContainerSize}`}
          style={{ display: load ? 'flex' : 'none' }}
        >
          <img
            className={styles.productToCartImg}
            src={image}
            alt='...'
            onLoad={handleLoad}
          />
        </div>
      )}
    </Fragment>
  )
}
