import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'
import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import SendIcon from '../icons/Send'
import MessageRenderer from './MessageRenderer'
import { InfoSocket, Message } from '../../typings/livestreaming'
import { useChat } from '../../hooks/useChat'
import { Login } from './login/Login'
import { ModalQuestion } from '../question/ModalQuestion'
import { getMobileOS, getDeviceType } from '../../utils'
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
  const {
    socket,
    chat,
    setChat,
    sessionId,
    messageToDelete,
    setMessageToDelete
  } = infoSocket
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

  const deleteMessage = useCallback(() => {
    if (
      !chat ||
      chat?.length === 0 ||
      !messageToDelete ||
      !setMessageToDelete ||
      !setChat
    ) {
      return
    }

    const newChat = chat.filter(
      (row: Message) =>
        row.username !== messageToDelete?.username ||
        row.data !== messageToDelete?.data ||
        row.sendDate !== messageToDelete?.sendDate
    )

    setChat(newChat)
    setMessageToDelete(undefined)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageToDelete])

  useEffect(() => {
    if (!chat || messageToDelete === undefined) return
    deleteMessage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageToDelete])

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isMobile = getDeviceType() === 'mobile'
      const visibilityStateIsHidden =
        document.visibilityState === ('hidden' || 'msHidden' || 'webkitHidden')

      if (!visibilityStateIsHidden || !setChat || !isMobile) return
      setChat([])
    }, 5000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.visibilityState])

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
            account={account}
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
              className={`${styles.inputTextChat} ${
                getMobileOS() === 'iOS' && styles.inputTextChatIOS
              }`}
              placeholder={placeholder}
              name='content'
              type='text'
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
          <div>
            <button type='submit' className={styles.btn}>
              <SendIcon size='21' viewBox='0 0 21 21' />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
