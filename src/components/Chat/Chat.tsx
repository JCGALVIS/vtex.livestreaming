import React, { useRef, useState, useMemo, useEffect } from 'react'

import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import SendIcon from '../icons/Send'
import MessageRenderer from './MessageRenderer'
// eslint-disable-next-line no-unused-vars
import { InfoSocket, Message } from '../../typings/livestreaming'
import { useChat } from '../../hooks/useChat'
import { Login } from './login/Login'
import { ModalQuestion } from '../question/ModalQuestion'
import styles from './chat.css'

type ChatProps = {
  title: string
  placeholder: string
  infoSocket: InfoSocket
  idLivestreaming: string
  account: string
}

const NUMBER_OF_PREVIOUS_MESSAGES = 10

export const Chat = ({
  title,
  placeholder,
  infoSocket,
  idLivestreaming,
  account
}: ChatProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const { socket, chat, setChat, sessionId } = infoSocket
  const [chatFiltered, setChatFiltered] = useState<Message[]>([])
  const { chatHistory } = useChat({
    idLivestreaming,
    account
  })
  const [showLoginWindow, setShowLoginWindow] = useState(false)
  const [sendFirstMessage, setSendFirstMessage] = useState(false)
  const [userIsLoggedInChat, setUserIsLoggedInChat] = useState(false)

  const handlerSendMessage = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.persist()
    const isEmpty = !(content !== null && content.trim() !== '')

    if (isEmpty || !socket) {
      return
    }

    if (!userIsLoggedInChat) {
      setTimeout(() => setShowLoginWindow(true), 200)

      return
    }

    const data = {
      action: 'sendmessage',
      data: content.replace(/\\/g, '\\\\').replace(/"/g, '\\"'),
      sessionId: sessionId,
      username: undefined
    }

    socket.send(JSON.stringify(data))
    setContent('')
  }

  const ChatMessages = useMemo(
    () => MessageRenderer(chatFiltered || []),
    [chatFiltered, chat]
  )

  useEffect(() => {
    if (!chat || !chatAreaRef?.current) return

    setChatFiltered(chat.slice(-NUMBER_OF_PREVIOUS_MESSAGES))
  }, [chat])

  useEffect(() => {
    if (chatAreaRef?.current) {
      const current = chatAreaRef?.current

      current.scrollBy(0, current.scrollHeight)
      setTimeout(() => {
        current.scrollBy(0, current.scrollHeight)
      }, 300)
    }
  }, [ChatMessages])

  useEffect(() => {
    if (setChat) setChat([])
  }, [setChat, chatHistory])

  useEffect(() => {
    const isLogged = localStorage.getItem('userIsLoggedInChat')

    if (!isLogged) return
    const userLoggedStorage = JSON.parse(isLogged)

    if (userLoggedStorage.id !== idLivestreaming) return

    setUserIsLoggedInChat(true)
    setShowLoginWindow(false)
  }, [idLivestreaming])

  return (
    <div className={styles.chatContainer}>
      <div className={styles.liveChatContainer}>
        <p className={styles.liveChatText}>{title}</p>
        <MessageLivestreamingIcon size='40' viewBox='0 0 400 400' />
      </div>
      <div className={styles.chatContent}>
        <div className={styles.chatArea} ref={chatAreaRef}>
          {ChatMessages}
        </div>

        {showLoginWindow && (
          <Login
            setShowLoginWindow={setShowLoginWindow}
            setUserIsLoggedInChat={setUserIsLoggedInChat}
            setSendFirstMessage={setSendFirstMessage}
            content={content}
            setContent={setContent}
            infoSocket={infoSocket}
            idLivestreaming={idLivestreaming}
          />
        )}

        <ModalQuestion
          infoSocket={infoSocket}
          idLivestreaming={idLivestreaming}
          account={account}
        />

        <form onSubmit={handlerSendMessage} className={styles.inputChatContent}>
          <div className={styles.inputContent}>
            <input
              className={styles.inputTextChat}
              placeholder={placeholder}
              name='content'
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
              }
              onFocus={() =>
                setShowLoginWindow(!userIsLoggedInChat && sendFirstMessage)
              }
              value={content}
              autoComplete='off'
            />
          </div>
          <div >
            <button type='submit'className={styles.btn}>
              <SendIcon size='21' viewBox='0 0 21 21' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
