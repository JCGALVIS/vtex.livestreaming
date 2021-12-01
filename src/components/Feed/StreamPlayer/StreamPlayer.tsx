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
import type { InfoSocket } from '../../../typings/livestreaming'
import { usePlayerFunctions, usePlayerLayout } from '../../../hooks'
import { DesktopControls, MobileControls } from '../Control'
import HighlightProduct from '../../HighlightProduct/HighlightProduct'
import ShareComponents from '../../ShareComponents'
import { ProductCart } from '../..'

import styles from '../../../styles.module.css'
import styles2 from './streamPlayer.css'

type streamPlayerProps = {
  collectionId: string | undefined
  infoSocket: InfoSocket
  player: MediaPlayer
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  setWidth: React.Dispatch<React.SetStateAction<string | number>>
  transmitionType: string | undefined
  streamUrl: string | undefined
  isFinalized: boolean
}

export const StreamPlayer = ({
  collectionId,
  infoSocket,
  player,
  setShowVariation,
  setWidth,
  transmitionType,
  streamUrl,
  isFinalized
}: streamPlayerProps) => {
  const [detector, setDetector] = useState<boolean>(false)
  const [openShare, setOpenShare] = useState(false)

  const { isModalLive, selectedProduct } = useContext(SettingContext)

  const {
    setting: { isInGlobalPage }
  } = useContext(ActionsContext)

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
  } = usePlayerFunctions({ player, videoEl, mainContainer, streamUrl })

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
    isFinalized
  ])

  const ProductCollection = useMemo(
    () =>
      selectedProduct &&
      selectedProduct.map((product, index) => (
        <ProductCart key={index} image={product.imageUrl} />
      )),
    [selectedProduct]
  )

  return (
    <Fragment>
      <div
        ref={mainContainer}
        className={`${
          isModalLive && !isInGlobalPage && styles2.playerUiPopoup
        } ${styles2.playerUi}`}
        onMouseOver={!inactive ? () => setOverlay(true) : () => {}}
        onMouseMove={() => {
          setInactive(false)
          setOverlay(true)
        }}
        onMouseOut={() => setOverlay(false)}
        onFocus={handleNothing}
        onBlur={handleNothing}
        style={
          !detector
            ? {
                height: dimensions.height,
                width: dimensions.width,
                maxHeight: !isVerticalLayout ? '340px' : '100%'
              }
            : {}
        }
      >
        {collectionId && (
          <HighlightProduct
            collectionId={collectionId}
            fullScreen={fullScreen}
            handleFullScreen={
              detector ? handleFullScreen : handleFullScreenMobile
            }
            infoSocket={infoSocket}
            setShowVariation={setShowVariation}
          />
        )}
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
            objectFit: detector && isVerticalLayout ? 'cover' : 'contain'
          }}
          onTimeUpdate={handleOnTimeUpdate}
        />
        {ControlWrapper}
        <div className={styles2.containerProductCart}>{ProductCollection}</div>
      </div>
    </Fragment>
  )
}
