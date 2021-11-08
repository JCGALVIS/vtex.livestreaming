import React, { useRef, useState, useMemo, useEffect, useCallback } from 'react'

import ChatIcon from '../icons/ChatIcon'
import SendIcon from '../icons/Send'
import MessageRenderer from './MessageRenderer'
import type { InfoSocket, Message } from '../../typings/livestreaming'
import { Login } from './login/Login'
import { ModalQuestion } from '../question/ModalQuestion'
import { getDeviceType } from '../../utils'
import ArrowDown from '../icons/ArrowDown'

import styles from './chat.css'

type ChatProps = {
  title: string
  placeholder: string
  infoSocket: InfoSocket
  idLivestreaming: string
  account: string
  pinnedMessage: Message | undefined
}

const NUMBER_OF_PREVIOUS_MESSAGES = 10

export const Chat = ({
  title,
  placeholder,
  infoSocket,
  idLivestreaming,
  account,
  pinnedMessage
}: ChatProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const formContainer = useRef<HTMLFormElement>(null)
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
  const [showLoginWindow, setShowLoginWindow] = useState(false)
  const [sendFirstMessage, setSendFirstMessage] = useState(false)
  const [userIsLoggedInChat, setUserIsLoggedInChat] = useState(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [incoming, setIncoming] = useState(false)
  const [incomingPosition, setIncomingPosition] = useState(0)
  const IS_DESKTOP = useMemo(() => window.screen.width >= 1025, [])

  const handleIncoming = (): void => {
    if (!chatAreaRef?.current) return

    chatAreaRef.current.scrollBy(
      0,
      chatAreaRef.current.scrollHeight - chatAreaRef.current.clientHeight
    )

    chatAreaRef.current.scrollBy(0, 0)
    setIncoming(false)
  }

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

    let newChat = chat.filter(
      (row: Message) =>
        row.username !== messageToDelete?.username ||
        row.data !== messageToDelete?.data ||
        row.sendDate !== messageToDelete?.sendDate
    )

    if (messageToDelete.all) {
      newChat = chat.filter(
        (row: Message) => row.username !== messageToDelete?.username
      )
    }

    setChat(newChat)
    setMessageToDelete(undefined)
  }, [messageToDelete])

  useEffect(() => {
    const timeout = setTimeout(() => {
      const isMobile = getDeviceType() === 'mobile'
      const visibilityStateIsHidden =
        document.visibilityState === ('hidden' || 'msHidden' || 'webkitHidden')

      if (!visibilityStateIsHidden || !setChat || !isMobile) return
      setChat([])
    }, 5000)

    return () => clearTimeout(timeout)
  }, [document.visibilityState])

  useEffect(() => {
    if (!chat || messageToDelete === undefined) return
    deleteMessage()
  }, [messageToDelete])

  useEffect(() => {
    if (scrolled) setIncoming(true)
  }, [chat])

  const ChatMessages = useMemo(
    () => MessageRenderer(chatFiltered || []),
    [chatFiltered, chat]
  )

  useEffect(() => {
    if (!chat || !chatAreaRef?.current || scrolled) return

    setChatFiltered(chat.slice(0, NUMBER_OF_PREVIOUS_MESSAGES))
  }, [chat, scrolled])

  useEffect(() => {
    if (!chatAreaRef?.current) return

    chatAreaRef.current.scrollTop = -1
    chatAreaRef.current.scrollTop = 0
  }, [chatFiltered])

  useEffect(() => {
    if (!setChat || scrolled) return

    const interval = setInterval(
      () =>
        setChat((prev: Message[]) =>
          prev.length > NUMBER_OF_PREVIOUS_MESSAGES
            ? prev.slice(0, NUMBER_OF_PREVIOUS_MESSAGES)
            : prev
        ),
      10000
    )

    return () => clearInterval(interval)
  }, [setChat, scrolled])

  useEffect(() => {
    const isLogged = localStorage.getItem('userIsLoggedInChat')

    if (!isLogged) return
    const userLoggedStorage = JSON.parse(isLogged)

    if (userLoggedStorage.id !== idLivestreaming) return

    setUserIsLoggedInChat(true)
    setShowLoginWindow(false)
  }, [idLivestreaming])

  useEffect(() => {
    if (!chatAreaRef?.current) return
    if (!formContainer?.current) return

    const config = { attributes: false, childList: true, subtree: false }
    const sizeObeserver = new ResizeObserver((entry: ResizeObserverEntry[]) => {
      const { height } = entry[0].target.getBoundingClientRect()

      setIncomingPosition(height + 5)
    })

    const mutationObs = new MutationObserver((mutations: MutationRecord[]) => {
      const target = mutations[0].target as HTMLDivElement

      target.scrollBy(0, target.scrollHeight - target.clientHeight)
    })

    mutationObs.observe(chatAreaRef.current, config)
    sizeObeserver.observe(formContainer.current)

    chatAreaRef.current.addEventListener(
      'scroll',
      (event) => {
        const { scrollTop } = event.target as HTMLDivElement

        setScrolled(scrollTop < 0)
        if (scrollTop >= 0) setIncoming(false)
      },
      { passive: true }
    )

    return () => {
      mutationObs.disconnect()
      sizeObeserver.disconnect()
      chatAreaRef?.current?.removeEventListener('scroll', () => {})
    }
  }, [])

  return (
    <div className={styles.chatContainer}>
      <div className={styles.liveChatContainer}>
        <div className={styles.liveChatHeader}>
          <ChatIcon />
          <p className={styles.liveChatText}>{title}</p>
        </div>
      </div>
      <div className={styles.chatContent}>
        {pinnedMessage && pinnedMessage?.data && (
          <div className={styles.liveChatPinnedMessage}>
            {MessageRenderer([pinnedMessage], true)}
          </div>
        )}
        <div className={styles.chatArea} ref={chatAreaRef}>
          {ChatMessages}
        </div>

        {incoming && (
          <div
            className={styles.chatIncomingWrapper}
            style={{
              bottom: incomingPosition,
              height: IS_DESKTOP ? 40 : 30,
              justifyContent: IS_DESKTOP ? 'center' : 'flex-start'
            }}
          >
            <div
              role='button'
              tabIndex={0}
              onClick={handleIncoming}
              onKeyDown={() => {}}
              className={styles.chatIncomingContainer}
              style={{
                backgroundColor: IS_DESKTOP ? '#2e2e2e' : '#ffffff',
                color: IS_DESKTOP ? '#f3f3f3' : '#585858'
              }}
            >
              <ArrowDown size={IS_DESKTOP ? 24 : 18} />
              <span
                style={{
                  marginLeft: 5,
                  fontSize: IS_DESKTOP ? 'unset' : '12px'
                }}
              >
                Mensajes sin leer
              </span>
            </div>
          </div>
        )}

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

        <form
          onSubmit={handlerSendMessage}
          className={styles.inputChatContent}
          ref={formContainer}
        >
          <div className={styles.inputContent}>
            <input
              className={styles.inputTextChat}
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
