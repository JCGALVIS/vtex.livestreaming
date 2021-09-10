import React, { useRef, useState, useMemo, useEffect } from 'react'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import ArrowRightLivestreaming from '../icons/ArrowRightLivestreaming'
import MessageRenderer from './MessageRenderer'
// eslint-disable-next-line no-unused-vars
import { InfoSocket, Message } from '../../typings/livestreaming'
import { useChat } from '../../hooks/useChat'

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

  const handlerSendMessage = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.persist()
    const isEmpty = !(content !== null && content.trim() !== '')

    if (isEmpty || !socket) {
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

    if (chat.length > 0)
      setChatFiltered(chat.slice(-NUMBER_OF_PREVIOUS_MESSAGES))

    if (chatHistory.length > 0)
      setChatFiltered(chatHistory.slice(-NUMBER_OF_PREVIOUS_MESSAGES))
  }, [chat, chatHistory])

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
  }, [setChat])

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
        <form onSubmit={handlerSendMessage} className={styles.inputChatContent}>
          <div className={styles.inputContent}>
            <Input
              placeholder={placeholder}
              name='content'
              resize='none'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setContent(e.target.value)
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
