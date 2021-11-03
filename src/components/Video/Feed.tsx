/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import type { InfoSocket } from '../../typings/livestreaming'
import { NoVideo } from '../NoVideo/NoVideo'
import { StreamPlayer } from './StreamPlayer/StreamPlayer'

type FeedProps = {
  collectionId: string | undefined
  infoSocket: InfoSocket
  isPlayerSupported: boolean
  kuikpay: boolean
  originOfProducts: string | undefined
  pdp: boolean
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  streamUrl: string | undefined
}

export const Feed = ({
  collectionId,
  infoSocket,
  isPlayerSupported,
  kuikpay,
  originOfProducts,
  pdp,
  setShowVariation,
  streamUrl
}: FeedProps) => {
  const { IVSPlayer } = window
  const { MediaPlayer } = IVSPlayer

  const [playerCurrent, setPlayerCurrent] = useState(false)
  const [liveStatus, setLiveStatus] = useState(false)
  const player: typeof MediaPlayer = useRef(null)

  const { isTransmiting } = infoSocket
  const isLive = infoSocket?.ivsRealTime?.status

  useEffect(() => {
    if (isLive === 'LIVE') setLiveStatus(true)
  }, [isLive])

  useEffect(() => {
    if (!isPlayerSupported) {
      console.warn(
        'The current browser does not support the Amazon IVS player.'
      )

      return
    }

    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType

    const onStateChange = () => {}

    const onError = (err: Error) => {
      console.warn('Player Event - ERROR:', err.message)
      setTimeout(() => {
        setPlayerCurrent(false)
        setPlayerCurrent(true)
      }, 5000)
    }

    player.current = IVSPlayer.create()
    player.current.load(streamUrl)

    player.current.addEventListener(READY, onStateChange)
    player.current.addEventListener(PLAYING, onStateChange)
    player.current.addEventListener(ENDED, onStateChange)
    player.current.addEventListener(ERROR, onError)

    setPlayerCurrent(true)

    return () => {
      player.current.removeEventListener(READY, onStateChange)
      player.current.removeEventListener(PLAYING, onStateChange)
      player.current.removeEventListener(ENDED, onStateChange)
      player.current.removeEventListener(ERROR, onError)
    }
  }, [IVSPlayer, isPlayerSupported, streamUrl])

  if (!isPlayerSupported) {
    return null
  }

  return isPlayerSupported && isTransmiting && playerCurrent ? (
    <StreamPlayer
      player={player.current}
      infoSocket={infoSocket}
      collectionId={collectionId}
      pdp={pdp}
      originOfProducts={originOfProducts}
      setShowVariation={setShowVariation}
      kuikpay={kuikpay}
    />
  ) : (
    <NoVideo isLive={isLive} liveStatus={liveStatus} />
  )
}
