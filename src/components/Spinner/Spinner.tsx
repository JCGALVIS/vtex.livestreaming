import React, { useContext } from 'react'

import { SettingContext } from '../../context/SettingContext'

import styles from './spinner.css'

export const Spinner = () => {
  const { isModalLive } = useContext(SettingContext)
  console.log('isModalLive: ', isModalLive)

  return (
    <div
      className={`${styles.loadingContainer} ${
        isModalLive && styles.loadingPopoup
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
