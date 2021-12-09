/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useMemo,
  Fragment,
  useContext
} from 'react'

import { ActionsContext, SettingContext } from '../../../context'
import type { MediaPlayer } from '../../../typings/MediaPlayer'
import { getDeviceType } from '../../../utils'
import { usePlayerFunctions, usePlayerLayout } from '../../../hooks'
import { DesktopControls, MobileControls } from '../Control'
import HighlightProduct from '../../HighlightProduct/HighlightProduct'
import ShareComponents from '../../ShareComponents'
import { ProductToCart } from '../..'

import styles from './streamPlayer.css'

type streamPlayerProps = {
  player: MediaPlayer
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
  streamUrl: string | undefined
  isFinalized: boolean
}

export const StreamPlayer = ({
  player,
  setShowVariation,
  transmitionType,
  streamUrl,
  isFinalized
}: streamPlayerProps) => {
  const [detector, setDetector] = useState<boolean>(false)
  const [openShare, setOpenShare] = useState(false)

  const { isModalLive } = useContext(SettingContext)

  const {
    setting: { isInGlobalPage }
  } = useContext(ActionsContext)

  const mobileOS = getDeviceType() === 'mobile'

  const { isVerticalLayout, mainContainer, videoEl, windowDimensions } =
    usePlayerLayout(transmitionType)

  const {
    BUFFERING,
    firstTimeMuted,
    fullScreen,
    handleFullScreen,
    handleFullScreenMobile,
    handleMainButton,
    handleMobileOptions,
    handleMute,
    handleNothing,
    handlePictureAndPicture,
    handleVolume,
    IDLE,
    inactive,
    muted,
    overlay,
    pictureInPicture,
    PLAYING,
    setInactive,
    setOverlay,
    showOptions,
    status,
    volume,
    progress,
    handleVideoProgress,
    handleOnTimeUpdate
  } = usePlayerFunctions({ player, videoEl, mainContainer, streamUrl })

  useEffect(() => {
    setDetector(mobileOS)
  }, [mobileOS, pictureInPicture])

  const ControlWrapper = useMemo(() => {
    const isMobile = windowDimensions.width <= 640

    const props = {
      BUFFERING,
      firstTimeMuted,
      fullScreen,
      handleFullScreen,
      handleFullScreenMobile,
      handleMainButton,
      handleMobileOptions,
      handleMute,
      handleNothing,
      handlePictureAndPicture,
      handleVolume,
      IDLE,
      inactive,
      isVerticalLayout,
      muted,
      overlay,
      pictureInPicture,
      PLAYING,
      setInactive,
      setOverlay,
      showOptions,
      status,
      videoEl,
      volume,
      progress,
      handleVideoProgress,
      handleOpenShare: () => setOpenShare(true),
      isFinalized
    }

    return (
      <Fragment>
        {isMobile ? (
          <MobileControls {...props} />
        ) : !fullScreen && isVerticalLayout ? (
          <MobileControls {...props} />
        ) : (
          <DesktopControls {...props} />
        )}
      </Fragment>
    )
  }, [
    BUFFERING,
    firstTimeMuted,
    fullScreen,
    handleFullScreen,
    handleFullScreenMobile,
    handleMainButton,
    handleMobileOptions,
    handleMute,
    handleNothing,
    handlePictureAndPicture,
    handleVolume,
    IDLE,
    inactive,
    isVerticalLayout,
    muted,
    overlay,
    pictureInPicture,
    PLAYING,
    setInactive,
    setOverlay,
    showOptions,
    status,
    videoEl,
    volume,
    progress,
    handleVideoProgress,
    isFinalized
  ])

  return (
    <Fragment>
      <div
        ref={mainContainer}
        className={`${styles.playerUi} ${
          isModalLive && !isInGlobalPage && styles.playerUiPopoup
        }  ${
          isVerticalLayout ? styles.verticalLayout : styles.horizontalLayout
        }`}
        onMouseOver={!inactive ? () => setOverlay(true) : () => {}}
        onMouseMove={() => {
          setInactive(false)
          setOverlay(true)
        }}
        onMouseOut={() => setOverlay(false)}
        onFocus={handleNothing}
        onBlur={handleNothing}
        style={
          isVerticalLayout && isModalLive && !detector && !isInGlobalPage
            ? { width: '25vw' }
            : {}
        }
      >
        <HighlightProduct
          fullScreen={fullScreen}
          handleFullScreen={
            detector ? handleFullScreen : handleFullScreenMobile
          }
          setShowVariation={setShowVariation}
        />
        {openShare && (
          <ShareComponents handleClose={() => setOpenShare(false)} />
        )}
        <video
          className={styles.playerVideoEl}
          controls={false}
          ref={videoEl}
          playsInline
          muted={muted}
          id='player-video-el'
          style={{
            objectFit: isVerticalLayout && !fullScreen ? 'cover' : 'contain'
          }}
          onTimeUpdate={handleOnTimeUpdate}
        />
        {ControlWrapper}
        <div className={styles.containerProductCart}>
          <ProductToCart />
        </div>
      </div>
    </Fragment>
  )
}
