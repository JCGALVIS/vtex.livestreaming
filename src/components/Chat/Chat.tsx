import React, { useRef, useState, useMemo, useEffect } from 'react'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import ArrorRightLivestreaming from '../icons/ArrorRightLivestreaming'
import styles from './../../styles.module.css'
import MessageRenderer from './MessageRenderer'
// eslint-disable-next-line no-unused-vars
import { InfoLivestreaming } from '../../typings/livestreaming'

type ChatProps = {
  title: string
  placeholder: string
  infoLivestreaming: InfoLivestreaming
}

export const Chat = ({ title, placeholder, infoLivestreaming }: ChatProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const { socket, chat, setChat, sessionId } = infoLivestreaming
  const chatHistory: never[] = []

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
    () => MessageRenderer(chatHistory || [], chat),
    [/* chatHistory, */ chat]
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
  }, [/* chatHistory, */ setChat])

  return (
    <div className={styles.container}>
      <div className={styles.liveChatContainer}>
        <p className={styles.liveChatText}>{title}</p>
        <MessageLivestreamingIcon size='40' viewBox='0 0 400 400' />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.chatArea} ref={chatAreaRef}>
          {ChatMessages}
        </div>
        <form onSubmit={handlerSendMessage} className={styles.inputChat}>
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
          <Button type='submit' variation='primary'>
            <ArrorRightLivestreaming size='40' viewBox='0 0 400 400' />
          </Button>
        </form>
      </div>
    </div>
  )
}
