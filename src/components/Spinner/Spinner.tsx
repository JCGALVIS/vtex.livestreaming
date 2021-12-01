import React, { useContext } from 'react'

import { ActionsContext, SettingContext } from '../../context'

import styles from './spinner.css'

export const Spinner = () => {
  const { isModalLive } = useContext(SettingContext)
  const {
    setting: { isInGlobalPage }
  } = useContext(ActionsContext)

  return (
    <div
      className={`${styles.loadingContainer} ${
        isModalLive && !isInGlobalPage && styles.loadingPopoup
      }`}
    >
      <div className={styles.loadingContent}>
        <div
          className={`${styles.loadingItem} ${styles.loadingAnimationOne}`}
        />
        <div
          className={`${styles.loadingItem} ${styles.loadingAnimationTwo}`}
        />
        <div
          className={`${styles.loadingItem} ${styles.loadingAnimationThree}`}
        />
        <div className={styles.loadingItem} />
      </div>
    </div>
  )
}
