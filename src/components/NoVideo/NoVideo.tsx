import React, { useEffect } from 'react'
import { getMobileOS } from '../../utils'
import styles from './NoVideo.css'

const messages = {
  noVideo: 'Transmisión en vivo.',
  UNKNOWN: 'Transmisión en vivo.',
  LIVE: 'Transmisión en vivo.'
}

type NoVideoProps = {
  isLive: string | undefined
  liveStatus: boolean
  setWidth: React.Dispatch<React.SetStateAction<string | number>>
  transmitionType: string | undefined
}

export const NoVideo = ({
  isLive,
  liveStatus,
  setWidth,
  transmitionType
}: NoVideoProps) => {
  useEffect(() => {
    if (transmitionType === 'vertical') {
      setWidth('278.438px')
    } else {
      setWidth('100%')
    }
  }, [transmitionType])

  return (
    <div
      className={styles.noVideoContainer}
      style={
        getMobileOS() === 'unknown'
          ? transmitionType === 'vertical'
            ? { height: '495px', width: '278.438px' }
            : { width: '100%' }
          : { width: '100%' }
      }
    >
      <span className={styles.noVideoText}>
        {isLive && (isLive === 'LIVE' || (liveStatus && isLive === 'UNKNOWN'))
          ? messages[isLive]
          : messages.noVideo}
      </span>
    </div>
  )
}
