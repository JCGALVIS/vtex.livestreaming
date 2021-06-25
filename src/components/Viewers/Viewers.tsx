// @ts-nocheck
import React, { useEffect, useState } from 'react'
import ViewersIcon from '../icons/ViewersIcon'
import styles from './viewers.css'

export const Viewers = ({ infoLivestreaming }: InfoLivestreaming) => {
  const [viewers, setViewers] = useState(0)
  const { ivsRealTime, showCounter } = infoLivestreaming

  useEffect(() => {
    console.log('me actualize', ivsRealTime, showCounter)
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setViewers(ivsRealTime.viewerCount)
    } else {
      setViewers(0)
    }
  }, [ivsRealTime])
  console.log('viewerrs', infoLivestreaming)
  if (!infoLivestreaming) {
    return null
  }

  return (
    <div>
      {showCounter ? (
        <div className={styles.viewersContainer}>
          <div className={styles.viewerIcon}>
            <ViewersIcon size='20' viewBox='0 0 400 400' />
          </div>
          <div className={styles.viewers}>{viewers}</div>
        </div>
      ) : null}
    </div>
  )
}
