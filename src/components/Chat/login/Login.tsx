import React, { useState, useContext } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import styles from './Login.css'
// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../../typings/livestreaming'
import { useSessionId } from '../../../hooks/useSessionId'
import { apiCall } from '../../../services'
import { useIntl } from 'react-intl'
import { ActionsContext } from '../../../context/ActionsContext'

interface Props {
  content: string
  infoSocket: InfoSocket
  setShowLoginWindow: React.Dispatch<React.SetStateAction<boolean>>
  setUserIsLoggedInChat: React.Dispatch<React.SetStateAction<boolean>>
  setSendFirstMessage: React.Dispatch<React.SetStateAction<boolean>>
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export const Login = ({
  content,
  setShowLoginWindow,
  setUserIsLoggedInChat,
  setSendFirstMessage,
  setContent,
  infoSocket
}: Props) => {
  const { formatMessage } = useIntl()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { sendAccountId, socket, emailIsRequired } = infoSocket
  const { sessionId } = useSessionId()
  const [errorUsername, setErrorUsername] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [erroMessage, setErrorMessage] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(false)

  const {
    setting: { account, idLivestreaming }
  } = useContext(ActionsContext)

  const handlerCloseCard = () => {
    setShowLoginWindow(false)
  }

  const sendMessage = () => {
    setTimeout(() => {
      const data = {
        action: 'sendmessage',
        data: content.replace(/\\/g, '\\\\').replace(/"/g, '\\"'),
        sessionId: sessionId,
        username
      }

      socket?.send(JSON.stringify(data))
      setContent('')
    }, 500)
  }

  const emailIsValid = () => {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/

    const isEmptyEmail = !(email !== null && email.trim() !== '')

    const isValid = emailIsRequired
      ? regEmail.test(email)
      : isEmptyEmail
      ? true
      : regEmail.test(email)

    setErrorEmail(!isValid)

    return isValid
  }

  const usernameIsValid = () => {
    const isEmptyUsername = !(username !== null && username.trim() !== '')

    if (isEmptyUsername) {
      setErrorMessage('Nombre no valido')
      setErrorUsername(true)
      return false
    }

    return true
  }

  const defineUsername = async () => {
    let URL = '__USERNAME_EXIST_URL'
    const { USERNAME_EXIST_URL } = process.env

    if (USERNAME_EXIST_URL && USERNAME_EXIST_URL !== URL) {
      URL = USERNAME_EXIST_URL
    }

    if (!URL) return

    const data = await apiCall({
      url: `${URL}?id=${idLivestreaming}&account=${account}&username=${username}`
    })

    return !data.exist ? username : `${username} ${data.number}`
  }

  const handlerSendDataToChat = async (event: React.SyntheticEvent) => {
    setDisabledBtn(true)
    event.preventDefault()
    event.persist()
    const isValid = await usernameIsValid()

    if (!isValid || !sendAccountId || !emailIsValid()) {
      setDisabledBtn(false)

      return
    }

    const newUsername = await defineUsername()

    sendAccountId(newUsername, email || '')
    sendMessage()

    localStorage.setItem(
      'userIsLoggedInChat',
      JSON.stringify({
        value: true,
        id: idLivestreaming
      })
    )
    setShowLoginWindow(false)
    setUserIsLoggedInChat(true)
    setSendFirstMessage(true)
  }

  return (
    <div className={styles.loginContainer}>
      <button className={styles.closeCardBtn} onClick={handlerCloseCard}>
        <IconClose size={23} />
      </button>

      <form onSubmit={handlerSendDataToChat} className={styles.loginForm}>
        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor='content'>
            {formatMessage({ id: 'store/live.chat-login' })}
          </label>
        </div>

        <div className={styles.inputContainer}>
          <input
            maxLength={15}
            placeholder={formatMessage({
              id: 'store/live.chat-login-name-placeholder'
            })}
            id='name'
            name='name'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            value={username}
            autoComplete='off'
            className={`${styles.input} ${
              errorUsername ? styles.inputError : ''
            }`}
          />
          {errorUsername ? (
            <div className={styles.inputErrorMessage}>{erroMessage}</div>
          ) : null}
        </div>
        {emailIsRequired && (
          <div className={styles.inputContainer}>
            <input
              placeholder={
                emailIsRequired
                  ? formatMessage({
                      id: 'store/live.chat-login-email-required-placeholder'
                    })
                  : formatMessage({
                      id: 'store/live.chat-login-email-no-required-placeholder'
                    })
              }
              id='email'
              name='email'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              value={email}
              autoComplete='off'
              className={`${styles.input} ${
                errorEmail ? styles.inputError : ''
              }`}
            />

            {errorEmail ? (
              <div className={styles.inputErrorMessage}>
                {formatMessage({ id: 'store/live.chat-login-invalid-email' })}
              </div>
            ) : null}
          </div>
        )}

        <button disabled={disabledBtn} type='submit' className={styles.btn}>
          {formatMessage({ id: 'store/live.chat-login-btn' })}
        </button>
      </form>
    </div>
  )
}
