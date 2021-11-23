import React, { useEffect, useContext } from 'react'
import { getMobileOS } from '../../utils'
import styles from './NoVideo.css'
import { FormattedMessage } from 'react-intl'
import { SettingContext } from '../../context/SettingContext'

const messages = {
  noVideo: <FormattedMessage id='store/text.live-no-video' />,
  UNKNOWN: <FormattedMessage id='store/text.live-no-video' />,
  LIVE: <FormattedMessage id='store/text.live-no-video' />
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
  const { isModalLive } = useContext(SettingContext)

  useEffect(() => {
    if (transmitionType === 'vertical') {
      setWidth('278.438px')
    } else {
      setWidth('100%')
    }
  }, [transmitionType])

  return (
    <div
      className={`${isModalLive && styles.noVideoContainerPopoup} ${
        styles.noVideoContainer
      }`}
      style={
        getMobileOS() === 'unknown'
          ? transmitionType === 'vertical'
            ? { height: '495px', width: '278.438px' }
            : { height: '430px', width: '100%' }
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
