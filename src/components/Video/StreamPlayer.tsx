import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
  Fragment
} from 'react'

import { MediaPlayer } from '../../typings/MediaPlayer'
import styles from './../../styles.module.css'
import MutedIcon from '../icons/MutedIcon'
import PlayIcon from '../icons/PlayIcon'
import PauseIcon from '../icons/PauseIcon'
import PictureAndPictureIcon from '../icons/PictureAndPictureIcon'
import PictureAndPictureAltIcon from '../icons/PictureAndPictureAltIcon'
import VolumeUpIcon from '../icons/VolumeUpIcon'
import VolumeOffIcon from '../icons/VolumeOffIcon'
import FullscreenIcon from '../icons/FullscreenIcon'
import FullscreenExitIcon from '../icons/FullscreenExitIcon'
import LoadingIcon from '../icons/LoadingIcon'
import { getMobileOS } from '../../utils'
import HighlightProduct from '../HighlightProduct/HighlightProduct'
// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'

interface HTMLVideoPicture extends HTMLVideoElement {
  requestPictureInPicture(): void
  onleavepictureinpicture(): void
  webkitEnterFullscreen(): void
  webkitExitFullScreen(): void
  webkitDisplayingFullscreen: boolean
}

interface IndicatorInterface {
  mute: boolean
  picture: boolean
  screen: boolean
  firstMuted: boolean
}

export const StreamPlayer = ({
  player,
  streamUrl,
  infoSocket,
  collectionId,
  pdp,
  originOfProducts,
  account
}: {
  player: MediaPlayer
  streamUrl: string | undefined
  infoSocket: InfoSocket
  collectionId: string | undefined
  pdp: boolean
  originOfProducts: string
  account: string
}) => {
  const { PLAYING, IDLE, BUFFERING } = window.IVSPlayer.PlayerState
  const [overlay, setOverlay] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  const [pictureInPicture, setPictureInPicture] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [status, setStatus] = useState<string>(IDLE)
  const [firstTimeMuted, setFirstTimeMuted] = useState<boolean>(true)
  const [
    { height: mainContainerHeight, width: mainContainerWidth },
    setMainContainerDims
  ] = useState<DOMRect>(new DOMRect())

  const videoEl = useRef<HTMLVideoPicture>(null)
  const mainContainer = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line promise/param-names
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))
  const handleNothing = () => {}

  const handleMainButton = (): void => {
    const state = player.getState()

    switch (state) {
      case PLAYING:
        player.pause()
        break

      case IDLE:
        player.play()
        break

      default:
        break
    }
  }

  const handlePictureAndPicture = (): void => {
    try {
      if (!videoEl.current) return

      setPictureInPicture((prev) => {
        if (prev) document.exitPictureInPicture()
        else if (videoEl.current) videoEl.current.requestPictureInPicture()

        return !prev
      })
    } catch (err) {
      setPictureInPicture(false)
    }
  }

  const getFullScreenElement = () => {
    let fullScreenElement

    if (document.fullscreenElement) {
      fullScreenElement = document.fullscreenElement
    } else if (document.mozFullScreenElement) {
      fullScreenElement = document.mozFullScreenElement
    } else if (document.webkitFullscreenElement) {
      fullScreenElement = document.webkitFullscreenElement
    } else if (document.msFullscreenElement) {
      fullScreenElement = document.msFullscreenElement
    }

    return fullScreenElement
  }

  const getExitFullScreenElement = () => {
    let exitFullScreenElement

    if (document.exitFullscreen) {
      exitFullScreenElement = document.exitFullscreen
    } else if (document.mozCancelFullScreen) {
      exitFullScreenElement = document.mozCancelFullScreen
    } else if (document.webkitExitFullscreen) {
      exitFullScreenElement = document.webkitExitFullscreen
    } else if (document.msExitFullscreen) {
      exitFullScreenElement = document.msExitFullscreen
    }

    return exitFullScreenElement
  }

  const getRequestFullScreenElement = (
    mainContainerCurrent: HTMLDivElement | Element | null
  ) => {
    let requestFullscreen

    if (mainContainerCurrent) {
      if (mainContainerCurrent.requestFullscreen) {
        requestFullscreen = mainContainerCurrent.requestFullscreen
      } else if (mainContainerCurrent.mozRequestFullScreen) {
        requestFullscreen = mainContainerCurrent.mozRequestFullScreen
      } else if (mainContainerCurrent.webkitRequestFullscreen) {
        requestFullscreen = mainContainerCurrent.webkitRequestFullscreen
      } else if (mainContainerCurrent.msRequestFullscreen) {
        requestFullscreen = mainContainerCurrent.msRequestFullscreen
      }
    }

    return requestFullscreen
  }

  async function handleFullScreen(): Promise<void> {
    if (!mainContainer.current) return

    if (pictureInPicture) {
      handlePictureAndPicture()
      await delay(500)
    }

    mainContainer.current.onfullscreenchange = (): void => {
      const fullScreenElement = getFullScreenElement()

      if (fullScreenElement) return
      const exitFullScreen = getExitFullScreenElement()
      if (exitFullScreen)
        exitFullScreen
          .bind(document)()
          .catch((err: Error) => console.error(err))
      setFullScreen(false)
    }

    setFullScreen((prev) => {
      if (prev) {
        const exitFullScreen = getExitFullScreenElement()
        if (exitFullScreen) exitFullScreen.bind(document)()
        return false
      } else {
        const requestFullscreen = getRequestFullScreenElement(
          mainContainer.current
        )

        if (requestFullscreen) requestFullscreen.bind(mainContainer.current)()
        return true
      }
    })
  }

  const handleFullScreenMobile = (): void => {
    const mobileDiv = document.getElementById('player-video-el')?.parentElement

    if (mobileDiv) {
      mobileDiv.onfullscreenchange = (): void => {
        const fullScreenElement = getFullScreenElement()

        if (fullScreenElement) return

        const exitFullScreen = getExitFullScreenElement()
        if (exitFullScreen)
          exitFullScreen
            .bind(document)()
            .catch((err: Error) => console.error(err))
        setFullScreen(false)
      }

      setFullScreen((prev) => {
        if (prev) {
          const exitFullScreen = getExitFullScreenElement()

          if (exitFullScreen)
            exitFullScreen
              .bind(document)()
              .catch((err: Error) => console.error(err))
          else videoEl.current?.webkitExitFullScreen()
        } else {
          const requestFullscreen = getRequestFullScreenElement(mobileDiv)

          if (requestFullscreen) requestFullscreen.bind(mobileDiv)()
          else videoEl.current?.webkitEnterFullscreen()
        }

        return !prev
      })
    }
  }

  const handleMute = () => {
    setMuted((prev) => {
      player.setMuted(!prev)

      return !prev
    })
    if (firstTimeMuted) {
      setFirstTimeMuted(false)
    }
  }

  const checkIfWebKit = useCallback((): boolean => {
    const ua = navigator.userAgent.toLowerCase()

    if (
      ua.indexOf('chrome') === ua.indexOf('android') &&
      ua.indexOf('safari') !== -1
    ) {
      // accessed via a WebKit-based browser
      return true
    }

    return (
      ua.indexOf('ipad') !== -1 ||
      ua.indexOf('iphone') !== -1 ||
      ua.indexOf('ipod') !== -1
    )
  }, [])

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

  useEffect(() => {
    if (!videoEl.current || !streamUrl) return () => {}

    player.pause()
    player.attachHTMLVideoElement(videoEl.current)
    player.load(streamUrl)
    player.play()
    player.setMuted(true)

    const vid = document.getElementById('player-video-el') as HTMLVideoElement

    document.addEventListener('webkitfullscreenchange', () => {
      const fullScreenElement =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement

      if (fullScreenElement) return

      const exitFullScreen =
        document.exitFullscreen ||
        document.mozCancelFullScreen ||
        document.webkitExitFullscreen ||
        document.msExitFullscreen

      if (exitFullScreen) exitFullScreen.bind(document)()
      setFullScreen(false)
    })

    if (vid) {
      vid.addEventListener('webkitendfullscreen', () => {
        // handle end full screen
        setTimeout(() => {
          player.setMuted(false)
          player.play()
        }, 1000)
      })
    }

    return () => {
      document.removeEventListener('webkitfullscreenchange', () => {})
      if (vid) vid.removeEventListener('webkitendfullscreen', () => {})
    }
  }, [player, streamUrl])

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(player.getState())
    }, 500)

    return () => clearInterval(interval)
  }, [player])

  useLayoutEffect(() => {
    let fullInterval: number | undefined

    if (videoEl.current) {
      videoEl.current.onleavepictureinpicture = () => setPictureInPicture(false)
      const isWebkit = checkIfWebKit()
      fullInterval = window.setInterval(() => {
        if (isWebkit && !document.webkitExitFullscreen && !pictureInPicture)
          setFullScreen(videoEl.current?.webkitDisplayingFullscreen || false)
      }, 500)
    }

    return () => {
      if (fullInterval) clearInterval(fullInterval)
    }
  }, [videoEl, checkIfWebKit, pictureInPicture])

  useLayoutEffect(() => {
    if (!mainContainer.current) return
    const sizeObeserver = new ResizeObserver((entry: ResizeObserverEntry[]) => {
      setMainContainerDims(entry[0].target.getBoundingClientRect())
    })

    sizeObeserver.observe(mainContainer.current)

    return () => sizeObeserver.disconnect()
  }, [mainContainer])

  useEffect(() => {
    if (
      !videoEl.current ||
      !streamUrl ||
      pictureInPicture ||
      getMobileOS() !== 'iOS' ||
      firstTimeMuted
    )
      return () => {}

    const interval = setInterval(() => {
      player.play()
      player.setMuted(false)
    }, 300)

    return () => clearInterval(interval)
  }, [pictureInPicture])

  return (
    <Fragment>
      <div
        ref={mainContainer}
        className={styles.playerUi}
        onMouseOver={() => setOverlay(true)}
        onMouseOut={() => setOverlay(false)}
        onFocus={handleNothing}
        onBlur={handleNothing}
        style={{
          height: fullScreen ? '100vh' : '',
          maxHeight: pictureInPicture ? (9 * mainContainerWidth) / 16 : '',
          paddingBottom: fullScreen ? 'unset' : ''
        }}
      >
        {collectionId && (
          <HighlightProduct
            infoSocket={infoSocket}
            collectionId={collectionId}
            pdp={pdp}
            originOfProducts={originOfProducts}
            account={account}
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
            role='button'
            tabIndex={0}
            onClick={handleFullScreenMobile}
            onKeyDown={handleFullScreenMobile}
            className={styles.playerVideoMobileFullscreen}
          >
            {fullScreen ? (
              <FullscreenExitIcon size='42' viewBox='0 0 400 400' />
            ) : (
              <FullscreenIcon size='42' viewBox='0 0 400 400' />
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
                  <PictureAndPictureIcon size='40' viewBox='0 0 400 400' />
                ) : (
                  <PictureAndPictureAltIcon size='40' viewBox='0 0 400 400' />
                )
              ) : null}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}
