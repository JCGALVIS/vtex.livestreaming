import React, { useContext, useEffect, useState } from 'react'
// import { getMobileOS } from '../../utils'
import styles from './NoVideo.css'
import { FormattedMessage } from 'react-intl'
import { ActionsContext, SettingContext } from '../../context'
import HighlightProduct from '../HighlightProduct/HighlightProduct'
import { getDeviceType } from '../../utils'
import { MediaPlayer } from '../../typings/MediaPlayer'
import { usePlayerFunctions, usePlayerLayout } from '../../hooks'

const messages = {
  noVideo: <FormattedMessage id='store/text.live-no-video' />,
  UNKNOWN: <FormattedMessage id='store/text.live-no-video' />,
  LIVE: <FormattedMessage id='store/text.live-no-video' />
}

type NoVideoProps = {
  isLive: string | undefined
  liveStatus: boolean
  player: MediaPlayer
  streamUrl: string | undefined
  transmitionType: string | undefined
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  isFinalized: boolean
}

export const NoVideo = ({ isLive, liveStatus, player, streamUrl, transmitionType, setShowVariation, isFinalized }: NoVideoProps) => {
  const [detector, setDetector] = useState<boolean>(false);
  const { isModalLive } = useContext(SettingContext)
  const {
    setting: { isInGlobalPage }
  } = useContext(ActionsContext)
  const mobileOS = getDeviceType() === 'mobile';
  const { mainContainer, videoEl } = usePlayerLayout(transmitionType);
  const {
    fullScreen,
    handleFullScreen,
    handleFullScreenMobile,
  } = usePlayerFunctions({player, videoEl, mainContainer, streamUrl})

  useEffect(() => {
    setDetector(mobileOS);
  }, [mobileOS]);

  return (
    <div
      className={`${
        isModalLive && !isInGlobalPage && styles.noVideoContainerPopoup
      } ${styles.noVideoContainer}`}
    >
      <HighlightProduct
        fullScreen={fullScreen}
        handleFullScreen={detector ? handleFullScreen : handleFullScreenMobile}
        setShowVariation={setShowVariation}
        isFinalized={isFinalized}
      />

      <span className={styles.noVideoText}>
        {isLive && (isLive === 'LIVE' || (liveStatus && isLive === 'UNKNOWN'))
          ? messages[isLive]
          : messages.noVideo}
      </span>
    </div>
  )
}
