/* eslint-disable no-unused-vars */
import React, { useMemo, useContext } from 'react'

import { HeartIcon } from '../icons'
import HeartComponent from './heart/Heart'
import { getRandomColor } from '../../utils'
import { ActionsContext, SettingContext } from '../../context'
import type { Heart } from '../../typings/livestreaming'

import styles from './like.css'

export const Like = () => {
  const { infoSocket } = useContext(SettingContext)

  const {
    socket,
    hearts: socketHearts,
    setHearts,
    sessionId,
    isTransmiting,
    queueSocket
  } = infoSocket || {}

  const {
    setting: { showLike }
  } = useContext(ActionsContext)

  const removeHeart = () => {
    if (setHearts) setHearts((prev: Heart[]) => prev.slice(1, prev.length))
  }

  const handleClick = () => {
    const id = Date.now()

    if (queueSocket && queueSocket.size() <= 4 && setHearts) {
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
      <HeartComponent key={id} color={color} removeHeart={removeHeart} />
    ))

  const HeartCollection = useMemo(
    () => heartRenderer(socketHearts || []),
    [socketHearts]
  )

  return showLike && isTransmiting ? (
    <div className={styles.likeWrapper}>
      <button className={styles.likeButton} onClick={handleClick}>
        <HeartIcon size='30' viewBox='0 0 400 400' />
      </button>
      {HeartCollection}
    </div>
  ) : null
}
