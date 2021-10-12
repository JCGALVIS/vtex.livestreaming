import React, { useState, useEffect, Fragment } from 'react'
import { getDeviceType } from '../../utils'
import styles from './modal.css'

interface ModalProps {
  show: boolean
}

export const Modal: SFC<ModalProps> = (props) => {
  const { children, show } = props
  const [showHideClassName, setShowHideClassName] = useState('')

  useEffect(() => {
    setShowHideClassName(
      show
        ? `${styles.modal} ${styles.displayBlock}`
        : `${styles.modal} ${styles.displayNone}`
    )
  }, [show])

  if (!show) return <Fragment />

  return (
    <div className={showHideClassName}>
      <div
        className={`${styles.modalMain} ${
          getDeviceType() === 'mobile' && styles.modalMainMobile
        }`}
      >
        <div className={styles.modalClose} />
        <div>{children}</div>
      </div>
    </div>
  )
}
