import React, { useContext } from 'react'
// import { getMobileOS } from '../../utils'
import styles from './NoVideo.css'
import { FormattedMessage } from 'react-intl'
import { ActionsContext, SettingContext } from '../../context'

const messages = {
  noVideo: <FormattedMessage id='store/text.live-no-video' />,
  UNKNOWN: <FormattedMessage id='store/text.live-no-video' />,
  LIVE: <FormattedMessage id='store/text.live-no-video' />
}

type NoVideoProps = {
  isLive: string | undefined
  liveStatus: boolean
}

export const NoVideo = ({ isLive, liveStatus }: NoVideoProps) => {
  const { isModalLive } = useContext(SettingContext)
  const {
    setting: { isInGlobalPage }
  } = useContext(ActionsContext)
  
  return (
    <div
      className={`${
        isModalLive && !isInGlobalPage && styles.noVideoContainerPopoup
      } ${styles.noVideoContainer}`}
    >
      <span className={styles.noVideoText}>
        {isLive && (isLive === 'LIVE' || (liveStatus && isLive === 'UNKNOWN'))
          ? messages[isLive]
          : messages.noVideo}
      </span>
    </div>
  )
}
