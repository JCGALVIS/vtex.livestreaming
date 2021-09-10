import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Message } from '../../typings/livestreaming'
import ProfileIcon from '../icons/ProfileIcon'
import styles from './chat.css'

const messageRenderer = (chatFiltered: Message[]) => {
  const getUserName = (username?: string) => {
    const AnonymousText = 'Anonymous'

    if (!username) return AnonymousText

    return username.replace('Anonymous', AnonymousText)
  }

  return chatFiltered.map((value: Message, index: number) => (
    <div key={index} className={styles.chatBubble}>
      <div className={styles.profileIcon}>
        <ProfileIcon size='40' viewBox='0 0 400 400' />
      </div>
      <div className={styles.chatTextContainer}>
        <span className={`${styles.chatUser} t-mini`}>
          {getUserName(value?.username)}
        </span>
        <span className={`${styles.chatMessage} mv3`}>{value.data}</span>
      </div>
      <br />
    </div>
  ))
}

export default messageRenderer
