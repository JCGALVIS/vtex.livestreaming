import React, { useState, useEffect } from 'react'

import { Feed } from './Feed'
import { NoVideo } from '../NoVideo/NoVideo'
// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
const IVS_PLAYER_MIN_JS =
  'https://player.live-video.net/1.2.0/amazon-ivs-player.min.js'

type VideoProps = {
  streamUrl: string | undefined
  infoSocket: InfoSocket
  collectionId: string | undefined
  pdp: boolean
  originOfProducts: string
}

export const Video = ({
  streamUrl,
  infoSocket,
  collectionId,
  pdp,
  originOfProducts
}: VideoProps) => {
  const [scriptVideoPlayer, setScriptVideoPlayer] = useState(false)
  const [isPlayerSupported, setIsPlayerSupported] = useState(false)
  const { isTransmiting } = infoSocket

  useEffect(() => {
    if (!scriptVideoPlayer) {
      const script = document.createElement('script')

      script.src = IVS_PLAYER_MIN_JS
      script.id = 'IVS'
      script.async = true
      document.body.appendChild(script)

      script.onload = () => {
        if (window?.IVSPlayer?.isPlayerSupported) {
          setIsPlayerSupported(true)
        }
      }
    }

    if (document.getElementById('IVS')) setScriptVideoPlayer(true)
  }, [])

  if (!isPlayerSupported) return null

  return isPlayerSupported && isTransmiting ? (
    <Feed
      streamUrl={streamUrl}
      infoSocket={infoSocket}
      collectionId={collectionId}
      pdp={pdp}
      originOfProducts={originOfProducts}
    />
  ) : (
    <NoVideo isLive={infoSocket?.ivsRealTime?.status} />
  )
}
