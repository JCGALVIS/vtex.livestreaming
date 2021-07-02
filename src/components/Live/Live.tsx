import React, { Fragment } from 'react'
// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import styles from './live.css'

interface LiveProps {
  infoSocket: InfoSocket
}

export const Live = ({ infoSocket }: LiveProps) => {
  const { isTransmiting } = infoSocket

  return (
    /* livestramingStatus !== 'FINALIZED' ? */ <Fragment>
      <span className={styles.liveText}>
        {isTransmiting ? 'Live' : 'Offline'}
      </span>
    </Fragment>
  )
}
