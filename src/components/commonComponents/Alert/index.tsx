import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { FormattedMessage } from 'react-intl'

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

export const Alert: FC<AlertProps> = (props) => {
  const { message, type } = props
  const [textOfMessage, setTextOfMessage] = useState<string | undefined>('')
  const { alertMessage, setAlertMessage } = useContext(SettingContext)
  const timeoutId = useRef<number>()
  const alertType = type || alertMessage?.type || 'success'

  const resetAlert = () => {
    setAlertMessage(null)
    setTextOfMessage('')
  }

  useEffect(() => {
    if (message || alertMessage) {
      if (timeoutId.current) clearTimeout(timeoutId.current)
      setTextOfMessage(message || alertMessage?.value || '')
      timeoutId.current = window.setTimeout(() => resetAlert(), 5000)
    }
  }, [message, alertMessage])

  return textOfMessage ? (
    <div className={styles.alertContainer}>
      <div className={`${styles.alertContent} ${styles[alertType]}`}>
        <AlertIcon type={alertType} /> <FormattedMessage id={textOfMessage} />
        <button className={styles.buttonClose} onClick={() => resetAlert()}>
          <Close size='16' viewBox='0 0 400 400' />
        </button>
      </div>
    </div>
  ) : null
}
