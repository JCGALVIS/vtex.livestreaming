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
  player: MediaPlayer
  infoSocket: InfoSocket
  collectionId: string | undefined
  originOfProducts: string | undefined
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setWidth: React.Dispatch<React.SetStateAction<string | number>>
  transmitionType: string | undefined
}

export const StreamPlayer = ({
  player,
  infoSocket,
  collectionId,
  originOfProducts,
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
    IDLE,
    inactive,
    muted,
    overlay,
    pictureInPicture,
    PLAYING,
    setInactive,
    setOverlay,
    showOptions,
    status
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
  }, [mobileOS, dimensions])

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
      videoEl
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
    videoEl
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
            infoSocket={infoSocket}
            collectionId={collectionId}
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
            objectFit: detector ? 'cover' : isVerticalLayout ? 'cover' : 'fill'
          }}
        />
        {ControlWrapper}
      </div>
    </Fragment>
  )
}
