import React, { useEffect, useState, useContext } from 'react'

import { SettingContext, ActionsContext } from '../../context'
import ViewersIcon from '../icons/ViewersIcon'
import styles from './viewers.module.css'

export const Viewers = () => {
  const {setting: {showViewers: initShowViewers}} = useContext(ActionsContext)
  const { infoSocket } = useContext(SettingContext)
  const { ivsRealTime, showCounter: socketShowViewers, isTransmiting } = infoSocket || {}

  const [showViewers, setShowViewers] = useState(true)
  const [viewers, setViewers] = useState(0)

  useEffect(()=>{
    if(initShowViewers === undefined){
      setShowViewers(socketShowViewers === undefined ? true : socketShowViewers)
    } else {
      setShowViewers(initShowViewers)
    }
  }, [initShowViewers, socketShowViewers])

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

  return showViewers && isTransmiting ? (
    <div className={styles.viewersContainer}>
      <div className={styles.viewerIcon}>
        <ViewersIcon size='20' viewBox='0 0 400 400' />
      </div>
      <div className={styles.viewers}>{viewers}</div>
    </div>
  ) : null
}
