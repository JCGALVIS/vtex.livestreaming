import React from 'react'
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
  return (
    <div className={styles.noVideoContainer}>
      <span className={styles.noVideoText}>
        {isLive && (isLive === 'LIVE' || (liveStatus && isLive === 'UNKNOWN'))
          ? messages[isLive]
          : messages.noVideo}
      </span>
    </div>
  )
}
