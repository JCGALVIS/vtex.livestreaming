import React, { useState } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import styles from './Login.css'
import { InfoSocket } from '../../../typings/livestreaming'
import { useSessionId } from '../../../hooks/useSessionId'
import { apiCall } from '../../../api/apiCall'

interface Props {
  idLivestreaming: string
  content: string
  infoSocket: InfoSocket
  account: string
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
  infoSocket,
  account
}: Props) => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { sendAccountId, socket, emailIsRequired } = infoSocket
  const { sessionId } = useSessionId()
  const [errorUsername, setErrorUsername] = useState(false)
  const [errorEmail, setErrorEmail] = useState(false)
  const [erroMessage, setErrorMessage] = useState('')
  const [disabledBtn, setDisabledBtn] = useState(false)

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
    const isEmptyUsername = !(username !== null && username.trim() !== '')

    if(isEmptyUsername){
      setErrorMessage('Nombre no valido')
      setErrorUsername(true)
      return false
    }

    let URL = '__USERNAME_EXIST_URL'
    const { USERNAME_EXIST_URL } = process.env

    if (USERNAME_EXIST_URL && USERNAME_EXIST_URL !== URL) {
      URL = USERNAME_EXIST_URL
    }

    if (!URL) return

    const data = await apiCall({
      url: `${URL}?id=${idLivestreaming}&account=${account}&username=${username}`
    })

    const isValid = !data.exist

    if (!isValid) {
      const errorMessage = !data.exist
        ? 'Nombre no valido'
        : 'Este nombre de usuario ya existe'

      setErrorMessage(errorMessage)
      setErrorUsername(true)
    }

    return isValid
  }

  const handlerSendDataToChat = async (event: React.SyntheticEvent) => {
    setDisabledBtn(true)
    event.preventDefault()
    event.persist()
    const isValid = await usernameIsValid()

    if (!isValid || !sendAccountId || !emailIsValid()){
      setDisabledBtn(false)

      return
    }

    sendAccountId(username, email || '')
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
            <div className={styles.inputErrorMessage}>{erroMessage}</div>
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

        <button disabled={disabledBtn} type='submit' className={styles.btn}>CONTINUAR CON EL CHAT</button>
      </form>
    </div>
  )
}
