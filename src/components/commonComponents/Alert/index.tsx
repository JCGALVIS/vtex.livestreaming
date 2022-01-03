import React, { useContext, useEffect } from 'react'
import { SettingContext } from '../../../context'
import { Close, Info, Success, Warning } from '../../icons'

import styles from './alert.css'

type AlertProps = {
  message?: string
  type?: string
}

const AlertIcon = (props: AlertProps) => {
  const { type } = props

  return type === 'success' ? (
    <Success size={24} viewBox='0 0 16 16' />
  ) : type === 'info' ? (
    <Info size='24' viewBox='0 0 24 24' />
  ) : (
    <Warning size={24} viewBox='0 0 16 16' />
  )
}

export const Alert = (props: AlertProps) => {
  const { message, type } = props

  const { messageAlert, setMessageAlert } = useContext(SettingContext)

  useEffect(() => {
    console.log('messageAlert: ', messageAlert)
  }, [messageAlert])

  const typeDefault = type || 'success'

  const textOfMessage = message || messageAlert

  return textOfMessage && textOfMessage.length > 0 ? (
    <div className={styles.alertContainer}>
      <div className={`${styles.alertContent} ${styles[typeDefault]}`}>
        <AlertIcon type={typeDefault} /> {textOfMessage}
        <button
          className={styles.buttonClose}
          onClick={() => setMessageAlert && setMessageAlert('')}
        >
          <Close size='16' viewBox='0 0 400 400' />
        </button>
      </div>
    </div>
  ) : null
}
