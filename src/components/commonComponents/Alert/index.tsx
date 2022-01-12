import React, { useContext, useEffect, useState } from 'react'
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

export const Alert = (props: AlertProps) => {
  const { message, type } = props
  const [textOfMessage, setTextOfMessage] = useState<string | undefined>('')

  const { messageAlert, setMessageAlert } = useContext(SettingContext)

  const typeDefault = type || 'success'

  useEffect(() => {
    if (message || messageAlert) {
      setTextOfMessage(message || messageAlert)
      setTimeout(() => {
        if (setMessageAlert) setMessageAlert('')
        setTextOfMessage('')
      }, 5000)
    }
  }, [message, messageAlert])

  return textOfMessage && textOfMessage.length > 0 ? (
    <div className={styles.alertContainer}>
      <div className={`${styles.alertContent} ${styles[typeDefault]}`}>
        <AlertIcon type={typeDefault} /> <FormattedMessage id={textOfMessage} />
        <button
          className={styles.buttonClose}
          onClick={() => {
            if (setMessageAlert) setMessageAlert('')
            setTextOfMessage('')
          }}
        >
          <Close size='16' viewBox='0 0 400 400' />
        </button>
      </div>
    </div>
  ) : null
}
