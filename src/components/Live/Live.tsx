import React, { Fragment, useContext } from 'react'
import { SettingContext } from '../../context'

import styles from './live.css'

export const Live = () => {
  const { infoSocket } = useContext(SettingContext)

  const { isTransmiting } = infoSocket || {}

  return (
    <Fragment>
      <span className={styles.liveText}>
        {isTransmiting ? 'Live' : 'Offline'}
      </span>
    </Fragment>
  )
}
