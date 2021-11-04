import React, { useEffect, useState } from 'react'
import { getMobileOS, calcHeightApp } from '../../utils'
import styles from './NoVideo.css'

const messages = {
  noVideo: 'Transmisión en vivo.',
  UNKNOWN: 'Transmisión en vivo.',
  LIVE: 'Transmisión en vivo.'
}

type NoVideoProps = {
  isLive: string | undefined
  liveStatus: boolean
}

export const NoVideo = ({ isLive, liveStatus }: NoVideoProps) => {
  const [detector, setDetector] = useState('')
  const [heightPlayerUI, setHeightPlayerUI] = useState<number>(0)

  const mobileOS = getMobileOS()

  useEffect(() => {
    setDetector(getMobileOS())
  }, [mobileOS])

  useEffect(() => {
    if (!detector) return
    setHeightPlayerUI(calcHeightApp())
  }, [detector])

  return (
    <div
      className={styles.noVideoContainer}
      style={{
        height: detector !== 'unknown' ? `${heightPlayerUI}px` : ''
      }}
    >
      <span className={styles.noVideoText}>
        {isLive && (isLive === 'LIVE' || (liveStatus && isLive === 'UNKNOWN'))
          ? messages[isLive]
          : messages.noVideo}
      </span>
    </div>
  )
}
