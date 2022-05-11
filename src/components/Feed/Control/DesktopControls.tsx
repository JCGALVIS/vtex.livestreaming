/* eslint-disable no-unused-vars */
import React, { Fragment, useMemo, ChangeEvent } from 'react'

import {
  FullscreenExitIcon,
  FullscreenIcon,
  LoadingIcon,
  MutedIcon,
  PauseIcon,
  PictureAndPictureAltIcon,
  PictureAndPictureIcon,
  PlayIcon,
  ShareIcon,
  VolumeOffIcon,
  VolumeUpIcon
} from '../../icons'
import type { PlayerControls } from '../../../typings/MediaPlayer'
import { Like } from '../../Like/Like'

import styles from '../../../styles.module.css'
import styles2 from '../StreamPlayer/streamPlayer.css'
import { getMobileOS } from '../../../utils'

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
    handleVolume,
    IDLE,
    muted,
    overlay,
    pictureInPicture,
    PLAYING,
    status,
    videoEl,
    volume,
    progress,
    handleVideoProgress,
    handleOpenShare,
    isFinalized
  } = props

  const buttonRenderer = (
    playerStatus: string,
    BUFFERING: string,
    overlay: boolean,
    firstTimeMuted: boolean,
    volume: number,
    { mute, picture, screen, firstMuted }: IndicatorInterface,
    progress: number,
    handleVideoProgress: (e: ChangeEvent<HTMLInputElement>) => void,
    isFinalized: boolean
  ): JSX.Element => {
    return (
      <Fragment>
        {videoEl?.current?.requestPictureInPicture && getMobileOS() !== 'Android' ? (
          <div
            role='button'
            tabIndex={0}
            className={`${styles.playerVideoPictureButtonPosition} ${styles.playerVideoButtonFlex}`}
            onClick={handlePictureAndPicture}
            onKeyDown={handleNothing}
          >
            {picture ? (
              <PictureAndPictureIcon size='40' viewBox='0 0 400 400' />
            ) : (
              <PictureAndPictureAltIcon size='40' viewBox='0 0 400 400' />
            )}
          </div>
        ): null}
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
        <div
          role='button'
          tabIndex={0}
          className={`${styles.playerVideoSharedButtonPosition} ${styles.playerVideoButtonFlex}`}
          onClick={() => handleOpenShare()}
          onKeyDown={() => handleOpenShare()}
        >
          {screen ? (
            <ShareIcon size='40' viewBox='0 0 400 400' />
          ) : (
            <ShareIcon size='40' viewBox='0 0 400 400' />
          )}
        </div>
        <div
          role='button'
          tabIndex={0}
          className={styles.playerVideoLikeButtonPosition}
        >
          <Like isFinalized={isFinalized} />
        </div>
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
                className={`${styles.playerVideoHover} ${styles.playerVideoCentralButtonPosition} ${styles.playerVideoCentralButtonBackground}`}
                onClick={handleMainButton}
                onKeyDown={handleNothing}
                data-status={playerStatus}
                data-visible={
                  status === BUFFERING || firstTimeMuted
                    ? BUFFERING
                    : overlay
                    ? 'on'
                    : 'off'
                }
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
                className={`${styles.playerVideoHover} ${styles.playerVideoMuteButtonPosition}`}
                onClick={handleMute}
                onKeyDown={handleNothing}
                data-visible={
                  status === BUFFERING || firstTimeMuted
                    ? BUFFERING
                    : overlay
                    ? 'on'
                    : 'off'
                }
              >
                {mute ? (
                  <VolumeOffIcon size='40' viewBox='0 0 400 400' />
                ) : (
                  <VolumeUpIcon size='40' viewBox='0 0 400 400' />
                )}
              </div>
              <div
                className={`${styles.playerVideoHover} ${styles.playerVideoVolumeRangePosition} ${styles.playerVideoVolumeRangeStack}`}
                data-visible={
                  status === BUFFERING || firstTimeMuted
                    ? BUFFERING
                    : overlay
                    ? 'on'
                    : 'off'
                }
              >
                <input
                  type='range'
                  min='0'
                  max='100'
                  value={muted ? 0 : volume}
                  className={styles.playerVolumeRange}
                  onChange={handleVolume}
                />
              </div>

              {isFinalized && (
                <div
                  className={`${styles.playerVideoHover} ${styles.playerVideoProgressBarPosition} ${styles.playerVideoProgressBarRangeStack}`}
                  data-visible={
                    status === BUFFERING || firstTimeMuted
                      ? BUFFERING
                      : overlay
                      ? 'on'
                      : 'off'
                  }
                >
                  <input
                    type='range'
                    min='0'
                    max='100'
                    value={progress}
                    className={styles.playerVideoProgressBar}
                    onChange={handleVideoProgress}
                  />
                  <div
                    style={{ width: `calc(${progress}% + 3px)` }}
                    className={styles.percentProgressBar}
                  />
                  <div className={styles.noPercentProgressBar} />
                </div>
              )}
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
      buttonRenderer(
        status,
        BUFFERING,
        overlay,
        firstTimeMuted,
        volume,
        {
          mute: muted,
          picture: pictureInPicture,
          screen: fullScreen,
          firstMuted: firstTimeMuted
        },
        progress,
        handleVideoProgress,
        isFinalized
      ),
    [
      status,
      muted,
      pictureInPicture,
      fullScreen,
      firstTimeMuted,
      BUFFERING,
      overlay,
      firstTimeMuted,
      volume,
      progress,
      handleVideoProgress,
      isFinalized
    ]
  )

  return (
    <div className={styles2.playerVideoGrid} style={{ height: '100%' }}>
      {MainButtonRenderer}
    </div>
  )
}
