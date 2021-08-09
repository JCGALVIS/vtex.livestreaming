import React, { useMemo } from 'react'
import IconHeart from '../icons/HeartIcon'
import HeartComponent from './heart/Heart'
import styles from './like.css'
import getRandomColor from '../../utils/getRandomColor'
// eslint-disable-next-line no-unused-vars
import { Heart, InfoSocket } from '../../typings/livestreaming'

interface LikeProps {
  infoSocket: InfoSocket
}

export const Like = ({ infoSocket }: LikeProps) => {
  const {
    socket,
    hearts: socketHearts,
    setHearts,
    sessionId,
    isTransmiting
  } = infoSocket

  const removeHeart = () => {
    if (setHearts) setHearts((prev: Heart[]) => prev.slice(1, prev.length))
  }

  const handleClick = () => {
    setHearts((prev) => [...prev, { id: Date.now(), color: getRandomColor() }])
    if (socket && socket?.readyState === 1) {
      const sendLike = {
        action: 'sendlike',
        sessionId: sessionId
      }

      socket.send(JSON.stringify(sendLike))
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

  return isTransmiting ? (
    <div className={styles.likeWrapper}>
      <button className={styles.likeButton} onClick={handleClick}>
        <IconHeart size='42' viewBox='0 0 400 400' />
      </button>
      {HeartCollection}
    </div>
  ) : null
}
