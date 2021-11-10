/* eslint-disable no-unused-vars */
import React, { Fragment } from 'react'

import { getMobileOS } from '../../../utils'
import {
  Close,
  FullscreenExitIcon,
  FullscreenIcon,
  MutedIcon,
  PictureAndPictureAltIcon,
  PictureAndPictureIcon,
  VerticalDots
} from '../../icons'
import type { PlayerControls } from '../../../typings/MediaPlayer'

import styles from '../../../styles.module.css'

export const MobileControls = (props: PlayerControls) => {
  const {
    firstTimeMuted,
    fullScreen,
    handleFullScreenMobile,
    handleMute,
    handleMobileOptions,
    handleNothing,
    handlePictureAndPicture,
    showOptions,
    pictureInPicture,
    videoEl
  } = props

  return (
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
                  <PictureAndPictureAltIcon size='32' viewBox='0 0 400 400' />
                )
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
