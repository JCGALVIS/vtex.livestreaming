import React, { useRef, useState, useMemo, useEffect } from 'react'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'
import { uuid } from 'uuidv4'

import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import ArrorRightLivestreaming from '../icons/ArrorRightLivestreaming'
import styles from './../../styles.module.css'
import useWebSocket from '../../hooks/useWebSocket'
import MessageRenderer from './MessageRenderer'

type ChatProps = {
  title: string
  placeholder: string
}

export const Chat = ({ title, placeholder }: ChatProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const { socket, chat, setChat } = useWebSocket()

  const chats = [
    {
      sessionId: '347291293i1293912301',
      data: 'genial',
      sendDate: '25 de mayo',
      username: 'Anonimo 67'
    }
  ]

  const handlerSendMessage = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    event.persist()
    const isEmpty = !(content !== null && content.trim() !== '')

    if (isEmpty || !socket) {
      return
    }

    const id = uuid()
    const data = {
      action: 'sendmessage',
      data: content.replace(/\\/g, '\\\\').replace(/"/g, '\\"'),
      sessionId: id,
      username: undefined
    }

    socket.send(JSON.stringify(data))
    setContent('')
  }

  const ChatMessages = useMemo(
    () => MessageRenderer(chats || [], chat),
    [/* chats, */ chat]
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
  }, [/* chats, */ setChat])

  return (
    <div className={styles.container}>
      <div className={styles.lifeChatContainer}>
        <p className={styles.lifeChatText}>{title}</p>
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
