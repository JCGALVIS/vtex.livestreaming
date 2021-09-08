import React, { useState } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'
import Button from '@vtex/styleguide/lib/Button'

import styles from './Login.css'
import { InfoSocket } from '../../../typings/livestreaming'
import { useSessionId } from '../../../hooks/useSessionId'

interface Props {
  idLivestreaming: string
  content: string
  infoSocket: InfoSocket
  setShowLoginWindow: React.Dispatch<React.SetStateAction<boolean>>
  setUserIsLoggedInChat: React.Dispatch<React.SetStateAction<boolean>>
  setSendFirstMessage: React.Dispatch<React.SetStateAction<boolean>>
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export const Login = ({
  idLivestreaming,
  content,
  setShowLoginWindow,
  setUserIsLoggedInChat,
  setSendFirstMessage,
  setContent,
  infoSocket
}: Props) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { sendAccountId, socket, emailIsRequired } = infoSocket
  const { sessionId } = useSessionId()
  const [errorUsername, setErrorUsername] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)

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

  const usernameIsValid = async () => {
    /*const response = await client.query({
      query: USERNAME_EXIST,
      variables: { id, username },
    })

    const isEmptyUsername = !(username !== null && username.trim() !== '')

    const isValid = !response.data.usernameExist.exist && !isEmptyUsername

    if (!isValid) {
      const errorMessage = !response.data.usernameExist.exist
        ? intl.formatMessage(message.loginInvalidUsername)
        : intl.formatMessage(message.usernameAlreadyExist)

      setErrorUsername(errorMessage)
    }*/

    const isEmptyUsername = !(username !== null && username.trim() !== '')
    setErrorUsername(isEmptyUsername)

    return !isEmptyUsername
  }

  const handlerSendDataToChat = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.persist()
    const isValid = await usernameIsValid()

    if (!isValid || !sendAccountId || !emailIsValid()) return

    sendAccountId(username, email)
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
            Ingrese su nombre para continuar
          </label>
        </div>

        <div className={styles.inputContainer}>
          <input
            maxLength={15}
            placeholder='Nombre*'
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
            <div className={styles.inputErrorMessage}>Nombre no valido</div>
          ) : null}
        </div>
        <div className={styles.inputContainer}>
          <input
            placeholder={emailIsRequired ? 'Email*' : 'Email'}
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
            <div className={styles.inputErrorMessage}>Email no valido</div>
          ) : null}
        </div>

        <Button type='submit' variation='primary' size='regular' block>
          <div className={styles.btnText}>CONTINUAR CON EL CHAT</div>
        </Button>
      </form>
    </div>
  )
}
