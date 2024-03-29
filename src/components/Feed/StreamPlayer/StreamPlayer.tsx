/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useState,
  useMemo,
  Fragment,
  useContext,
  useRef
} from 'react'

import { ActionsContext, SettingContext } from '../../../context'
import type { MediaPlayer } from '../../../typings/MediaPlayer'
import { getDeviceType } from '../../../utils'
import { usePlayerFunctions, usePlayerLayout } from '../../../hooks'
import { DesktopControls, MobileControls } from '../Control'
import ShareComponents from '../../ShareComponents'
import Animations from '../../PromotionNotification/Animations'
import { ProductToCart } from '../..'

import styles from './streamPlayer.css'

type streamPlayerProps = {
  player: MediaPlayer
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
  streamUrl: string | undefined
  isFinalized: boolean
  setHighlightProps: React.Dispatch<React.SetStateAction<{}>>
}

export const StreamPlayer = ({
  player,
  setShowVariation,
  transmitionType,
  streamUrl,
  isFinalized,
  setHighlightProps
}: streamPlayerProps) => {
  const [detector, setDetector] = useState<boolean>(false)
  const [openShare, setOpenShare] = useState(false)
  const { isModalLive, activePromo } = useContext(SettingContext)

  const canvasRef = useRef<HTMLCanvasElement>(null)
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
    setHighlightProps({
      detector,
      fullScreen,
      handleFullScreen,
      handleFullScreenMobile
    })
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
      isFinalized,
      setShowVariation,
      transmitionType
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
        {activePromo && activePromo.message !== '' && (
          <Fragment>
            <Animations
              canvas={canvasRef}
              message={activePromo.message}
              animation={activePromo.animation}
            />
          </Fragment>
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
    <div
      ref={mainContainer}
      className={styles.playerUi}
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
          : isModalLive && detector
          ? { height: '100%', maxHeight: '100%' }
          : {}
      }
    >
      {openShare && <ShareComponents handleClose={() => setOpenShare(false)} />}
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 2
        }}
      />
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
  )
}
