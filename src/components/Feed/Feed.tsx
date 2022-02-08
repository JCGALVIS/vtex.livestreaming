import React, { useEffect, useRef, useState, useContext } from 'react'

import { ActionsContext, SettingContext } from '../../context'
import { usePlayerLayout } from '../../hooks'
import { NoVideo } from '../NoVideo/NoVideo'
import { StreamPlayer } from './StreamPlayer/StreamPlayer'

import styles from './feed.css'

type FeedProps = {
  isPlayerSupported: boolean
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  streamUrl: string | undefined
  transmitionType: string | undefined
  livestreamingStatus: string
}

export const Feed = ({
  isPlayerSupported,
  setShowVariation,
  streamUrl,
  transmitionType,
  livestreamingStatus
}: FeedProps) => {
  const { infoSocket, isModalLive } = useContext(SettingContext)
  const {
    setting: { isInGlobalPage }
  } = useContext(ActionsContext)

  const { isVerticalLayout } = usePlayerLayout(transmitionType)

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
  return (
    <div
      className={`${isModalLive && !isInGlobalPage && styles.playerUiPopoup}  ${
        isVerticalLayout ? styles.verticalLayout : styles.horizontalLayout
      }`}
    >
      {playerCurrent && (isFinalized ? streamUrl : isTransmiting) ? (
        <StreamPlayer
          player={player.current}
          streamUrl={streamUrl}
          setShowVariation={setShowVariation}
          transmitionType={transmitionType}
          isFinalized={isFinalized}
        />
      ) : (
        <NoVideo isLive={isLive} liveStatus={liveStatus} streamUrl={streamUrl} player={player.current} transmitionType={transmitionType} setShowVariation={setShowVariation} isFinalized={isFinalized} />
      )}
    </div>
  )
}
