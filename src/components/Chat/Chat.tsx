/* eslint-disable no-unused-vars */
import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  useCallback,
  useContext
} from 'react'
import { useIntl } from 'react-intl'

import ChatIcon from '../icons/ChatIcon'
import SendIcon from '../icons/Send'
import GifIcon from '../icons/GifIcon'
import MessageRenderer from './MessageRenderer'
import type { Message } from '../../typings/livestreaming'
import { Login } from './login/Login'
import GiphySearch from '../Giphy/Giphy'
import { ModalQuestion } from '../question/ModalQuestion'
import { getDeviceType } from '../../utils'
import ArrowDown from '../icons/ArrowDown'
import {
  ActionsContext,
  SettingContext,
  useLivestreamingContext
} from '../../context'

import styles from './chat.css'

type ChatProps = {
  pinnedMessage: Message | undefined
  transmitionType: string | undefined
  initShowGif: boolean | undefined
}

const NUMBER_OF_PREVIOUS_MESSAGES = 10

export const Chat = ({
  pinnedMessage,
  transmitionType,
  initShowGif
}: ChatProps) => {
  const { formatMessage } = useIntl()
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const formContainer = useRef<HTMLFormElement>(null)
  const [content, setContent] = useState<string>('')
  const [chatFiltered, setChatFiltered] = useState<Message[]>([])
  const [showLoginWindow, setShowLoginWindow] = useState(false)
  const [sendFirstMessage, setSendFirstMessage] = useState(false)
  const [userIsLoggedInChat, setUserIsLoggedInChat] = useState(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [incoming, setIncoming] = useState(false)
  const [incomingPosition, setIncomingPosition] = useState(0)
  const IS_DESKTOP = useMemo(() => window.screen.width >= 1025, [])
  const [showGif, setShowGif] = useState(false)
  const [showGifButton, setShowGifButton] = useState<boolean | undefined>(false)
  const [selectedGif, setSelectedGif] = useState<string>()
  const [fisrtLoad, setFirstLoad] = useState(true)

  const { infoSocket, isModalLive, showCarouselChat } =
    useContext(SettingContext)
  const { chat: chatFinalizedEvents } = useLivestreamingContext()

  const {
    socket,
    chat,
    setChat,
    sessionId,
    messageToDelete,
    setMessageToDelete,
    showGif: showGifButtonSocket
  } = infoSocket || {}

  const {
    setting: { idLivestreaming }
  } = useContext(ActionsContext)
  const isMobile = getDeviceType() === 'mobile'

  const handleIncoming = (): void => {
    if (!chatAreaRef?.current) return

    chatAreaRef.current.scrollBy(
      0,
      chatAreaRef.current.scrollHeight - chatAreaRef.current.clientHeight
    )

    chatAreaRef.current.scrollBy(0, 0)
    setIncoming(false)
  }

  const handlerSendMessage = async (
    event?: React.SyntheticEvent,
    type = 'string',
    gif?: string
  ) => {
    if (event) {
      event.preventDefault()
      event.persist()
    }
    const isEmpty = !(content !== null && content.trim() !== '')
    const isEmptyGif = gif === undefined || gif?.trim() === ''

    if ((isEmpty && isEmptyGif) || !socket) {
      return
    }

    if (!userIsLoggedInChat) {
      setTimeout(() => setShowLoginWindow(true), 200)
      setSelectedGif(gif)
      setShowGif(false)
      return
    }

    const data = {
      action: 'sendmessage',
      data: content.replace(/\\/g, '\\\\').replace(/"/g, '\\"') || gif,
      sessionId: sessionId,
      username: undefined,
      type
    }

    socket.send(JSON.stringify(data))
    if (type !== 'gif') {
      setContent('')
    } else {
      setShowGif(false)
    }
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
    () =>
      MessageRenderer(
        infoSocket?.socket ? chatFiltered : chatFinalizedEvents || []
      ),
    [chatFiltered, chat, chatFinalizedEvents]
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

  useEffect(() => {
    if (fisrtLoad) {
      if (initShowGif === undefined) return
      setShowGifButton(initShowGif)
      setFirstLoad(false)
    } else {
      if (showGifButtonSocket === undefined) {
        setShowGifButton(initShowGif)
        return
      }
      setShowGifButton(showGifButtonSocket)
    }
  }, [initShowGif, fisrtLoad, showGifButtonSocket])

  const handleShowGif = () => {
    setShowGif(!showGif)
  }

  return (
    <div
      className={styles.chatContainer}
      style={
        isModalLive && transmitionType === 'vertical' && !isMobile
          ? { maxWidth: 390, minWidth: 390 }
          : {}
      }
    >
      <div className={styles.liveChatContainer}>
        <div className={styles.liveChatHeader}>
          <ChatIcon />
          <p className={styles.liveChatText}>
            {formatMessage({ id: 'store/live.chat' })}
          </p>
        </div>
      </div>
      <div className={styles.chatContent}>
        {pinnedMessage && pinnedMessage?.data && IS_DESKTOP && (
          <div className={styles.liveChatPinnedMessage}>
            {MessageRenderer([pinnedMessage], true)}
          </div>
        )}
        <div
          className={`${styles.chatArea} ${
            showCarouselChat ? styles.activeChatCarousel : ''
          }`}
          ref={chatAreaRef}
        >
          {ChatMessages}
        </div>

        {pinnedMessage && pinnedMessage?.data && !IS_DESKTOP && (
          <div className={styles.liveChatPinnedMessage}>
            <div className={styles.chatArea}>
              {MessageRenderer([pinnedMessage], true)}
            </div>
          </div>
        )}

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
                {formatMessage({ id: 'store/text.unread-messages' })}
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
            selectedGif={selectedGif}
          />
        )}

        <ModalQuestion />
        <div>
          <GiphySearch showGif={showGif} sendGif={handlerSendMessage} />
          <form
            onSubmit={handlerSendMessage}
            className={styles.inputChatContent}
            ref={formContainer}
          >
            <div className={styles.inputContent}>
              <input
                className={styles.inputTextChat}
                placeholder={formatMessage({
                  id: 'store/text.chat-placeholder'
                })}
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
            <div className={styles.buttonsChat}>
              {showGifButton && (
                <span
                  onClick={handleShowGif}
                  className={styles.gifIconContainer}
                >
                  <GifIcon viewBox='0 0 22 10' size='25' />
                </span>
              )}
              <button type='submit' className={styles.btn}>
                <SendIcon size='21' viewBox='0 0 21 21' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
