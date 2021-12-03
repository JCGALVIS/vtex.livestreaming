import React, { useEffect, useRef, useState, useContext } from 'react'

import { SettingContext } from '../../context'
import { NoVideo } from '../NoVideo/NoVideo'
import { StreamPlayer } from './StreamPlayer/StreamPlayer'

type FeedProps = {
  isPlayerSupported: boolean
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setWidth: React.Dispatch<React.SetStateAction<string | number>>
  streamUrl: string | undefined
  transmitionType: string | undefined
  livestreamingStatus: string
}

export const Feed = ({
  isPlayerSupported,
  setShowVariation,
  setWidth,
  streamUrl,
  transmitionType,
  livestreamingStatus
}: FeedProps) => {
  const { infoSocket } = useContext(SettingContext)

  const { IVSPlayer } = window
  const { MediaPlayer } = IVSPlayer

  const [playerCurrent, setPlayerCurrent] = useState(false)
  const [liveStatus, setLiveStatus] = useState(false)
  const player: typeof MediaPlayer = useRef(null)

  const { isTransmiting } = infoSocket || {}
  const isLive = infoSocket?.ivsRealTime?.status
  const isFinalized = livestreamingStatus === 'FINALIZED'

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
  return playerCurrent && (isFinalized ? streamUrl : isTransmiting) ? (
    <StreamPlayer
      player={player.current}
      streamUrl={streamUrl}
      setShowVariation={setShowVariation}
      setWidth={setWidth}
      transmitionType={transmitionType}
      isFinalized={isFinalized}
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
