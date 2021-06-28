import React from 'react'
import styles from './NoVideo.css'

// type VideoMessageType = 'LIVE' | 'FINALIZED'

const messages = {
  noVideo: 'Esperando conexión con el stream.',
  FINALIZED: 'El evento ha finalizado.',
  LIVE: 'Empezaremos en unos minutos."'
}

export const NoVideo = ({ isLive }: { isLive: string | undefined }) => {
  return (
    <div className={styles.noVideoContainer}>
      <span className={styles.noVideoText}>
        {isLive && ['LIVE', 'FINALIZED'].includes(isLive)
          ? messages[isLive]
          : messages.noVideo}
      </span>
    </div>
  )
}
