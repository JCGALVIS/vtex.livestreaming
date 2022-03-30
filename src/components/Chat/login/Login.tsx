import React, { useState, useContext } from 'react'
import { useIntl } from 'react-intl'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import styles from './Login.css'
import { useSessionId } from '../../../hooks/useSessionId'
import { apiCall } from '../../../services'
import { ActionsContext, SettingContext } from '../../../context'
import { config } from '../../../enviroment/config'

interface Props {
  content: string
  selectedGif: string | undefined
  setShowLoginWindow: React.Dispatch<React.SetStateAction<boolean>>
  setUserIsLoggedInChat: React.Dispatch<React.SetStateAction<boolean>>
  setSendFirstMessage: React.Dispatch<React.SetStateAction<boolean>>
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export const Login = ({
  content,
  selectedGif,
  setShowLoginWindow,
  setUserIsLoggedInChat,
  setSendFirstMessage,
  setContent
}: Props) => {
  const { formatMessage } = useIntl()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [errorUsername, setErrorUsername] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [erroMessage, setErrorMessage] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(false)

  const { infoSocket } = useContext(SettingContext)
  const { sessionId } = useSessionId()

  const { sendAccountId, socket, emailIsRequired, setShowLoader } = infoSocket || {}

  const {
    setting: { account, environment, idLivestreaming }
  } = useContext(ActionsContext)

  const handlerCloseCard = () => {
    setShowLoginWindow(false)

    if(setShowLoader) setShowLoader(false)
  }

  const sendMessage = () => {
    setTimeout(() => {
      const data = {
        action: 'sendmessage',
        data:
          selectedGif || content.replace(/\\/g, '\\\\').replace(/"/g, '\\"'),
        sessionId: sessionId,
        username,
        type: selectedGif ? 'gif' : 'string'
      }

      socket?.send(JSON.stringify(data))
      setContent('')
    }, 500)
  }

  const emailIsValid = () => {
    const regEmail =
      /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z_\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const isEmptyEmail = !(email !== null && email.trim() !== '')

    const isValid = emailIsRequired
      ? regEmail.test(email.trim())
      : isEmptyEmail
      ? true
      : regEmail.test(email.trim())

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
    const { USERNAME_EXIST_URL } = config(environment || '')

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
    if(!setShowLoader) return
    setShowLoader(true)
    setDisabledBtn(true)
    event.preventDefault()
    event.persist()
    const isValid = await usernameIsValid()

    if (!isValid || !sendAccountId || !emailIsValid()) {
      setDisabledBtn(false)
      setShowLoader(false)
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
    setShowLoader(false)
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
            autoFocus
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
              autoCorrect='off'
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
