/* eslint-disable no-unused-vars */
import React, { Fragment, useMemo } from 'react'

import {
  FullscreenExitIcon,
  FullscreenIcon,
  LoadingIcon,
  MutedIcon,
  PauseIcon,
  PictureAndPictureAltIcon,
  PictureAndPictureIcon,
  PlayIcon,
  VolumeOffIcon,
  VolumeUpIcon
} from '../../icons'
import type { PlayerControls } from '../../../typings/MediaPlayer'

import styles from '../../../styles.module.css'

interface IndicatorInterface {
  mute: boolean
  picture: boolean
  screen: boolean
  firstMuted: boolean
}

export const DesktopControls = (props: PlayerControls) => {
  const {
    BUFFERING,
    firstTimeMuted,
    fullScreen,
    handleFullScreen,
    handleMainButton,
    handleMute,
    handleNothing,
    handlePictureAndPicture,
    IDLE,
    muted,
    overlay,
    pictureInPicture,
    PLAYING,
    status,
    videoEl
  } = props

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

  return (
    <div
      className={`${styles.playerVideoHover} ${styles.playerVideoGrid}`}
      style={{ height: '100%' }}
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
  )
}
