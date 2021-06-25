import React, { Fragment } from 'react'
// eslint-disable-next-line no-unused-vars
import { InfoLivestreaming } from '../../typings/livestreaming'
import styles from './live.css'

interface LiveProps {
  infoLivestreaming: InfoLivestreaming
}

export const Live = ({ infoLivestreaming }: LiveProps) => {
  const { isTransmiting } = infoLivestreaming

  return (
    /* livestramingStatus !== 'FINALIZED' ? */ <Fragment>
      <span className={styles.liveText}>
        {isTransmiting ? 'Live' : 'Offline'}
      </span>
    </Fragment>
  )
}
