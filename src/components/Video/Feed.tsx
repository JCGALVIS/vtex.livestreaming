/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import type { InfoSocket } from '../../typings/livestreaming'
import { NoVideo } from '../NoVideo/NoVideo'
import { StreamPlayer } from './StreamPlayer/StreamPlayer'

type FeedProps = {
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
  const [playbackUrl, setPlaybackUrl] = useState<string | undefined>()
  const [loading, setLoading] = useState(false)
  const player: typeof MediaPlayer = useRef(null)

  const isLive = infoSocket?.ivsRealTime?.status

  useEffect(() => {
    if (isLive === 'LIVE') setLiveStatus(true)
  }, [isLive])

  useEffect(() => {
    const url =
      streamUrl || (recordPath && `${recordPath}/media/hls/master.m3u8`)

    if (url) {
      setPlaybackUrl(url)
    }
  }, [streamUrl, recordPath, loading])

  useEffect(() => {
    if (!isPlayerSupported) {
      console.warn(
        'The current browser does not support the Amazon IVS player.'
      )

      return
    }

    if (!playbackUrl) return

    const { ENDED, PLAYING, READY } = IVSPlayer.PlayerState
    const { ERROR } = IVSPlayer.PlayerEventType

    const onStateChange = () => {
      const newState = player.current.getState()
      setLoading(newState !== PLAYING)
    }

    const onError = (err: Error) => {
      console.warn('Player Event - ERROR:', err.message)
      setTimeout(() => {
        setPlayerCurrent(false)
        setPlayerCurrent(true)
      }, 5000)
    }

    player.current = IVSPlayer.create()
    player.current.load(playbackUrl)

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
  }, [IVSPlayer, isPlayerSupported, playbackUrl])

  if (!isPlayerSupported) {
    return null
  }

  return playerCurrent && (liveStatus || (!liveStatus && recordPath)) ? (
    <StreamPlayer
      player={player.current}
      infoSocket={infoSocket}
      collectionId={collectionId}
      originOfProducts={originOfProducts}
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
