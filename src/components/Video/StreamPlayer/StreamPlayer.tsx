/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
  Fragment
} from 'react'

import type {
  MediaPlayer,
  StreamPlayerType
} from '../../../typings/MediaPlayer'
import {
  Close,
  FullscreenExitIcon,
  FullscreenIcon,
  LoadingIcon,
  MutedIcon,
  PauseIcon,
  PictureAndPictureAltIcon,
  PictureAndPictureIcon,
  PlayIcon,
  VerticalDots,
  VolumeOffIcon,
  VolumeUpIcon
} from '../../icons'
import { getMobileOS, calcHeightApp } from '../../../utils'
import HighlightProduct from '../../HighlightProduct/HighlightProduct'
import type { InfoSocket } from '../../../typings/livestreaming'

import styles from '../../../styles.module.css'
import { usePlayerFunctions } from '../../../hooks'

interface IndicatorInterface {
  mute: boolean
  picture: boolean
  screen: boolean
  firstMuted: boolean
}

type streamPlayerProps = {
  player: MediaPlayer
  infoSocket: InfoSocket
  collectionId: string | undefined
  originOfProducts: string | undefined
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}

export const StreamPlayer = ({
  player,
  infoSocket,
  collectionId,
  originOfProducts,
  setShowVariation
}: streamPlayerProps) => {
  const [
    { height: mainContainerHeight, width: mainContainerWidth },
    setMainContainerDims
  ] = useState<DOMRect>(new DOMRect())

  const videoEl = useRef<StreamPlayerType>(null)
  const mainContainer = useRef<HTMLDivElement>(null)

  const [detector, setDetector] = useState('')
  const [heightPlayerUI, setHeightPlayerUI] = useState<number>(0)

  const mobileOS = getMobileOS()

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

  useEffect(() => {
    setDetector(getMobileOS())
  }, [mobileOS])

  useEffect(() => {
    if (!detector) return
    setHeightPlayerUI(calcHeightApp())
  }, [detector])

  const buttonRenderer = (
    playerStatus: string,
    { mute, picture, screen, firstMuted }: IndicatorInterface
  ): JSX.Element => {
    return (
      <Fragment>
        {playerStatus === PLAYING || playerStatus === IDLE ? (
          firstMuted ? (
            <div
              role='button'
              tabIndex={0}
              className={`${styles.playerVideoCentralButtonPosition} ${styles.playerVideoCentralButtonBackground}`}
              onClick={handleMute}
              onKeyDown={handleNothing}
            >
              <MutedIcon size='100' viewBox='0 0 400 400' />
            </div>
          ) : (
            <Fragment>
              <div
                role='button'
                tabIndex={0}
                className={`${styles.playerVideoCentralButtonPosition} ${styles.playerVideoCentralButtonBackground}`}
                onClick={handleMainButton}
                onKeyDown={handleNothing}
                data-status={playerStatus}
              >
                {playerStatus === PLAYING ? (
                  <PauseIcon size='100' viewBox='0 0 400 400' />
                ) : (
                  <PlayIcon size='100' viewBox='0 0 400 400' />
                )}
              </div>
              <div
                role='button'
                tabIndex={0}
                className={`${styles.playerVideoMuteButtonPosition} ${styles.playerVideoButtonFlex}`}
                onClick={handleMute}
                onKeyDown={handleNothing}
              >
                {mute ? (
                  <VolumeOffIcon size='40' viewBox='0 0 400 400' />
                ) : (
                  <VolumeUpIcon size='40' viewBox='0 0 400 400' />
                )}
              </div>
              <div
                role='button'
                tabIndex={0}
                className={`${styles.playerVideoPictureButtonPosition} ${styles.playerVideoButtonFlex}`}
                onClick={handlePictureAndPicture}
                onKeyDown={handleNothing}
              >
                {videoEl?.current?.requestPictureInPicture ? (
                  picture ? (
                    <PictureAndPictureIcon size='40' viewBox='0 0 400 400' />
                  ) : (
                    <PictureAndPictureAltIcon size='40' viewBox='0 0 400 400' />
                  )
                ) : null}
              </div>
              <div
                role='button'
                tabIndex={0}
                className={`${styles.playerVideoFullscreenButtonPosition} ${styles.playerVideoButtonFlex}`}
                onClick={handleFullScreen}
                onKeyDown={handleNothing}
              >
                {screen ? (
                  <FullscreenExitIcon size='40' viewBox='0 0 400 400' />
                ) : (
                  <FullscreenIcon size='40' viewBox='0 0 400 400' />
                )}
              </div>
            </Fragment>
          )
        ) : status === BUFFERING ? (
          <div
            className={`${styles.playerVideoCentralButtonPosition} ${styles.playerVideoCentralButtonBackground}`}
            data-status={playerStatus}
          >
            <LoadingIcon size='100' viewBox='0 0 400 400' />
          </div>
        ) : null}
      </Fragment>
    )
  }

  const MainButtonRenderer = useMemo(
    () =>
      buttonRenderer(status, {
        mute: muted,
        picture: pictureInPicture,
        screen: fullScreen,
        firstMuted: firstTimeMuted
      }),
    [status, muted, pictureInPicture, fullScreen, firstTimeMuted]
  )

  useLayoutEffect(() => {
    if (!mainContainer.current) return
    const sizeObeserver = new ResizeObserver((entry: ResizeObserverEntry[]) => {
      setMainContainerDims(entry[0].target.getBoundingClientRect())
    })

    sizeObeserver.observe(mainContainer.current)

    return () => sizeObeserver.disconnect()
  }, [mainContainer])

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
          height:
            detector !== 'unknown'
              ? `${heightPlayerUI}px`
              : fullScreen
              ? '100vh'
              : '',
          maxHeight: pictureInPicture ? (9 * mainContainerWidth) / 16 : '',
          paddingBottom: fullScreen ? 'unset' : ''
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
            height: !pictureInPicture ? '100%' : ''
          }}
        />
        <div
          className={`${styles.playerVideoHover} ${styles.playerVideoGrid}`}
          style={{
            height: fullScreen ? '100%' : mainContainerHeight
          }}
          data-visible={
            status === BUFFERING || firstTimeMuted
              ? BUFFERING
              : overlay
              ? 'on'
              : 'off'
          }
        >
          {MainButtonRenderer}
        </div>
        <div className={styles.playerVideoMobile}>
          {firstTimeMuted ? (
            <div
              role='button'
              tabIndex={0}
              onClick={handleMute}
              onKeyDown={handleNothing}
              className={styles.playerVideoMobileMuted}
            >
              <MutedIcon size='100' viewBox='0 0 400 400' />
            </div>
          ) : (
            <Fragment />
          )}
          <div
            className={styles.playerVideoMobileOptions}
            onClick={handleMobileOptions}
            onKeyDown={handleMobileOptions}
          >
            {showOptions ? (
              <Close size='42' viewBox='0 0 400 400' />
            ) : (
              <VerticalDots size='42' viewBox='0 0 400 400' />
            )}
            <div
              className={styles.playerVideoMobileOptionsContent}
              data-display={`${showOptions}`}
            >
              <div
                role='button'
                tabIndex={0}
                onClick={handleFullScreenMobile}
                onKeyDown={handleFullScreenMobile}
                className={styles.playerVideoMobileFullscreen}
              >
                {fullScreen ? (
                  <FullscreenExitIcon size='40' viewBox='0 0 400 400' />
                ) : (
                  <FullscreenIcon size='40' viewBox='0 0 400 400' />
                )}
              </div>
              {!!videoEl?.current?.requestPictureInPicture && (
                <div
                  role='button'
                  tabIndex={0}
                  onClick={handlePictureAndPicture}
                  onKeyDown={handlePictureAndPicture}
                  className={styles.playerVideoMobilePicture}
                >
                  {!!videoEl?.current?.requestPictureInPicture &&
                  getMobileOS() !== 'Android' ? (
                    pictureInPicture ? (
                      <PictureAndPictureIcon size='32' viewBox='0 0 400 400' />
                    ) : (
                      <PictureAndPictureAltIcon
                        size='32'
                        viewBox='0 0 400 400'
                      />
                    )
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
