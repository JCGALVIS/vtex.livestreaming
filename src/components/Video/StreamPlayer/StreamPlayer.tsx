/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo, Fragment } from 'react'

import type { MediaPlayer } from '../../../typings/MediaPlayer'
import { getDeviceType } from '../../../utils'
import type { InfoSocket } from '../../../typings/livestreaming'
import { usePlayerFunctions, usePlayerLayout } from '../../../hooks'
import { DesktopControls, MobileControls } from '../Control'
import HighlightProduct from '../../HighlightProduct/HighlightProduct'

import styles from '../../../styles.module.css'

type streamPlayerProps = {
  activateLike: boolean
  collectionId: string | undefined
  infoSocket: InfoSocket
  originOfProducts: string | undefined
  player: MediaPlayer
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setWidth: React.Dispatch<React.SetStateAction<string | number>>
  transmitionType: string | undefined
}

export const StreamPlayer = ({
  activateLike,
  collectionId,
  infoSocket,
  originOfProducts,
  player,
  setShowVariation,
  setWidth,
  transmitionType
}: streamPlayerProps) => {
  const [detector, setDetector] = useState<boolean>(false)

  const mobileOS = getDeviceType() === 'mobile'

  const {
    containerDimensions,
    isVerticalLayout,
    mainContainer,
    videoEl,
    windowDimensions
  } = usePlayerLayout(transmitionType)

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
  } = usePlayerFunctions({ player, videoEl, mainContainer })

  const dimensions = fullScreen
    ? {
        height: '100vh',
        width: '100vw'
      }
    : containerDimensions

  useEffect(() => {
    setDetector(mobileOS)
    setWidth(dimensions.width)
  }, [mobileOS, dimensions, pictureInPicture])

  const ControlWrapper = useMemo(() => {
    const isMobile = windowDimensions.width <= 640

    const props = {
      activateLike,
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
      infoSocket,
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
      handleOnTimeUpdate
    }

    return (
      <Fragment>
        {isMobile || isVerticalLayout ? (
          <MobileControls {...props} />
        ) : (
          <DesktopControls {...props} />
        )}
      </Fragment>
    )
  }, [
    activateLike,
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
    infoSocket,
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
    handleOnTimeUpdate
  ])

  return (
    <Fragment>
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
        style={{
          height: dimensions.height,
          width: dimensions.width
        }}
      >
        {collectionId && (
          <HighlightProduct
            collectionId={collectionId}
            fullScreen={fullScreen}
            handleFullScreen={
              detector ? handleFullScreen : handleFullScreenMobile
            }
            infoSocket={infoSocket}
            originOfProducts={originOfProducts}
            setShowVariation={setShowVariation}
          />
        )}
        <video
          className={styles.playerVideoEl}
          controls={false}
          ref={videoEl}
          playsInline
          muted={muted}
          id='player-video-el'
          style={{
            objectFit: detector
              ? 'cover'
              : isVerticalLayout
              ? 'contain'
              : 'fill'
          }}
          onTimeUpdate={handleOnTimeUpdate}
        />
        {ControlWrapper}
      </div>
    </Fragment>
  )
}
