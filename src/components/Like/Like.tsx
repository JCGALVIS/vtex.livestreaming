/* eslint-disable no-unused-vars */
import React, { useMemo, useContext } from 'react'
import IconHeart from '../icons/HeartIcon'
import HeartComponent from './heart/Heart'
import type { Heart, InfoSocket } from '../../typings/livestreaming'
import { getRandomColor } from '../../utils'
import { ActionsContext } from '../../context/ActionsContext'

import styles from './like.css'
interface LikeProps {
  infoSocket: InfoSocket
}

export const Like = ({ infoSocket }: LikeProps) => {
  const {
    socket,
    hearts: socketHearts,
    setHearts,
    sessionId,
    isTransmiting,
    queueSocket
  } = infoSocket

  const {
    setting: { showLike }
  } = useContext(ActionsContext)

  const removeHeart = () => {
    if (setHearts) setHearts((prev: Heart[]) => prev.slice(1, prev.length))
  }

  const handleClick = () => {
    const id = Date.now()

    if (queueSocket && queueSocket.size() <= 4) {
      setHearts((prev) => [...prev, { id, color: getRandomColor() }])
      queueSocket.add(id)
    }

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
      <HeartComponent
        key={id}
        color={color}
        removeHeart={removeHeart}
        infoSocket={infoSocket}
      />
    ))

  const HeartCollection = useMemo(
    () => heartRenderer(socketHearts || []),
    [socketHearts]
  )

  return showLike && isTransmiting ? (
    <div className={styles.likeWrapper}>
      <button className={styles.likeButton} onClick={handleClick}>
        <IconHeart size='30' viewBox='0 0 400 400' />
      </button>
      {HeartCollection}
    </div>
  ) : null
}
