// @ts-nocheck
import React, { useMemo } from 'react'
import IconHeart from '../icons/FullscreenIcon'

import HeartComponent from './heart/Heart'
import styles from './like.css'
import getRandomColor from '../../utils/getRandomColor'

export const Like = ({ infoLivestreaming }: InfoLivestreaming) => {
  const {
    socket,
    hearts: socketHearts,
    setHearts,
    sessionId
  } = infoLivestreaming

  const removeHeart = () => {
    if (setHearts) setHearts((prev: Heart[]) => prev.slice(1, prev.length))
  }

  const handleClick = () => {
    if (socket && socket?.readyState === 1) {
      const sendLike = {
        action: 'sendlike',
        sessionId: sessionId
      }

      socket.send(JSON.stringify(sendLike))
    } else {
      setHearts((prev) => [
        ...prev,
        { id: Date.now(), color: getRandomColor() }
      ])
    }
  }

  const heartRenderer = (array: Heart[]) =>
    array.map(({ id, color }: Heart) => (
      <HeartComponent key={id} color={color} removeHeart={removeHeart} />
    ))

  const HeartCollection = useMemo(
    () => heartRenderer(socketHearts || []),
    [socketHearts]
  )

  return (
    <div className={styles.likeWrapper}>
      <button className={styles.likeButton} onClick={handleClick}>
        <IconHeart size='42' viewBox='0 0 400 400' />
      </button>
      {HeartCollection}
    </div>
  )
}
