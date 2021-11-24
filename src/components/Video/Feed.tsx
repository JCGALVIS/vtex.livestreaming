/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import type { InfoSocket } from '../../typings/livestreaming'
import { NoVideo } from '../NoVideo/NoVideo'
import { StreamPlayer } from './StreamPlayer/StreamPlayer'

type FeedProps = {
  activateLike: boolean
  collectionId: string | undefined
  infoSocket: InfoSocket
  isPlayerSupported: boolean
  originOfProducts: string | undefined
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setWidth: React.Dispatch<React.SetStateAction<string | number>>
  recordPath: string | undefined
  streamUrl: string | undefined
  transmitionType: string | undefined
}

export const Feed = ({
  activateLike,
  collectionId,
  infoSocket,
  isPlayerSupported,
  originOfProducts,
  setShowVariation,
  setWidth,
  recordPath,
  streamUrl,
  transmitionType
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

    const onStateChange = () => {
      const newState = player.current.getState()
      console.warn(newState)
    }

    const onError = (err: Error) => {
      console.warn('Player Event - ERROR:', err.message)
      setTimeout(() => {
        setPlayerCurrent(false)
        setPlayerCurrent(true)
      }, 5000)
    }

    player.current = IVSPlayer.create()
    if (streamUrl) {
      player.current.load(streamUrl)
    } else if (recordPath && !streamUrl) {
      player.current.load(`${recordPath}/media/hls/master.m3u8`)
    }

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
  }, [IVSPlayer, isPlayerSupported, streamUrl, recordPath])

  if (!isPlayerSupported) {
    return null
  }

  return playerCurrent &&
    ((streamUrl && isTransmiting) ||
      (recordPath && !streamUrl && !isTransmiting)) ? (
    <StreamPlayer
      activateLike={activateLike}
      collectionId={collectionId}
      infoSocket={infoSocket}
      originOfProducts={originOfProducts}
      player={player.current}
      setShowVariation={setShowVariation}
      setWidth={setWidth}
      transmitionType={transmitionType}
    />
  ) : (
    <NoVideo
      isLive={isLive}
      liveStatus={liveStatus}
      setWidth={setWidth}
      transmitionType={transmitionType}
    />
  )
}
