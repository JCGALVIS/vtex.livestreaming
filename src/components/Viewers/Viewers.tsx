import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import ViewersIcon from '../icons/ViewersIcon'
import styles from './viewers.css'
interface ViewersProps {
  infoSocket: InfoSocket
}

export const Viewers = ({ infoSocket }: ViewersProps) => {
  const [viewers, setViewers] = useState(0)
  const { ivsRealTime, showCounter, isTransmiting } = infoSocket

  useEffect(() => {
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setViewers(ivsRealTime.viewerCount)
    } else {
      setViewers(0)
    }
  }, [ivsRealTime])

  if (!infoSocket) {
    return null
  }

  return (
    <div>
      {showCounter && isTransmiting ? (
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
