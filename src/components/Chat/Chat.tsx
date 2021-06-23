import React, { useRef, useState } from 'react'
import Button from '@vtex/styleguide/lib/Button'
import Input from '@vtex/styleguide/lib/Input'

//import { Message } from './../../typings/livestreaming'
import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import ArrorRightLivestreaming from '../icons/ArrorRightLivestreaming'

import styles from './../../styles.module.css'

type ChatProps = {
  title: string
  placeholder: string
}

export const Chat = ({ title, placeholder }: ChatProps) => {
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')

  return (
    <div className={styles.container}>
      <div className={styles.lifeChatContainer}>
        <p className={styles.lifeChatText}>{title}</p>
        <MessageLivestreamingIcon size='40' viewBox='0 0 400 400' />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.chatArea} ref={chatAreaRef}>
          {/* {ChatMessages} */}
        </div>
        <form className={styles.inputChat}>
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
