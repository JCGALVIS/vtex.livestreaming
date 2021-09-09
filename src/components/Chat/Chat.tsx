import React, { useRef, useState, useMemo, useEffect } from 'react'
import Button from '@vtex/styleguide/lib/Button'

import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import ArrowRightLivestreaming from '../icons/ArrowRightLivestreaming'
import MessageRenderer from './MessageRenderer'
import { InfoSocket } from '../../typings/livestreaming'
import { useChat } from '../../hooks/useChat'
import { Login } from './login/Login'
import styles from './chat.css'

type ChatProps = {
  title: string
  placeholder: string
  infoSocket: InfoSocket
  idLivestreaming: string
  account: string
}

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
    () => MessageRenderer(chatHistory || [], chat),
    [chatHistory, chat]
  )

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
  }, [chatHistory, setChat])

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
          <div className={styles.buttonConetnt}>
            <Button type='submit' variation='primary'>
              <ArrowRightLivestreaming size='40' viewBox='0 0 400 400' />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
