/* eslint-disable no-unused-vars */
import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  ChangeEvent
} from 'react'

import type { MediaPlayer, StreamPlayerType } from '../typings/MediaPlayer'
import { getMobileOS } from '../utils'

type PlayerFuntionsProps = {
  mainContainer: React.RefObject<HTMLDivElement>
  player: MediaPlayer
  videoEl: React.RefObject<StreamPlayerType>
}

const usePlayerFunctions = (props: PlayerFuntionsProps) => {
  const { mainContainer, player, videoEl } = props
  const { PLAYING, IDLE, BUFFERING } = window.IVSPlayer.PlayerState

  const [pictureInPicture, setPictureInPicture] = useState<boolean>(false)
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [muted, setMuted] = useState<boolean>(true)
  const [firstTimeMuted, setFirstTimeMuted] = useState<boolean>(true)
  const [status, setStatus] = useState<string>(IDLE)
  const [overlay, setOverlay] = useState<boolean>(false)
  const [inactive, setInactive] = useState<boolean>(false)
  const [showOptions, setShowOptions] = useState<boolean>(false)
  const [volume, setVolume] = useState<number>(100)
  const [progress, setProgress] = useState(0)

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

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
          else if (videoEl.current) videoEl.current.webkitExitFullScreen()
        } else {
          const requestFullscreen = getRequestFullScreenElement(mobileDiv)

          if (requestFullscreen) requestFullscreen.bind(mobileDiv)()
          else if (videoEl.current) videoEl.current.webkitEnterFullscreen()
        }

        return !prev
      })
    }
  }

  const handleMute = () => {
    setMuted((prev) => {
      player.setMuted(!prev)
      if (prev) {
        setVolume((prevVol) => {
          const newVol = prevVol === 0 ? 100 : prevVol

          player.setVolume(newVol / 100)

          return newVol
        })
      }

      return !prev
    })
    if (firstTimeMuted) {
      setFirstTimeMuted(false)
    }
  }

  const handleVolume = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)

    const isMuted = value === 0

    setFirstTimeMuted(false)
    setVolume(value)
    player.setVolume(value / 100)
    setMuted(isMuted)
    player.setMuted(isMuted)
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

  const initPlayer = () => {
    if (!videoEl.current) return () => {}

    player.pause()
    player.attachHTMLVideoElement(videoEl.current)
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
  }

  useEffect(initPlayer, [player])

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

  useEffect(() => {
    if (
      !videoEl.current ||
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

  useEffect(() => {
    if (!overlay) return

    const timeout = setTimeout(() => {
      setInactive(true)
      setOverlay(false)
    }, 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [overlay])

  const handleMobileOptions = () => setShowOptions((prev) => !prev)

  const handleVideoProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if(!videoEl.current) return
    const manualChange = Number(e.target.value);
    setProgress(manualChange)
    videoEl.current.currentTime = (videoEl.current?.duration / 100) * manualChange;
  };

  const handleOnTimeUpdate = () => {
    if(!videoEl.current) return
    const progress = (videoEl.current.currentTime / videoEl.current.duration) * 100;
    setProgress(progress)
  };

  return {
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
  }
}

export default usePlayerFunctions
