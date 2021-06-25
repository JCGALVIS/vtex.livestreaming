// @ts-nocheck
import React, { Fragment } from 'react'
import styles from './live.css'

export const Live = ({ infoLivestreaming }: InfoLivestreaming) => {
  const { isTransmiting } = infoLivestreaming
  const livestramingStatus = 'LIVE'

  return livestramingStatus !== 'FINALIZED' ? (
    <Fragment>
      <span className={styles.liveText}>
        {isTransmiting ? 'Live' : 'Offline'}
      </span>
    </Fragment>
  ) : null
}
