import React from 'react'
import { Message } from '../../typings/livestreaming'
import ProfileIcon from '../icons/ProfileIcon'
import styles from './chat.css'

const NUMBER_OF_PREVIOUS_MESSAGES = 15

const messageRenderer = (
  previousMessages: Message[],
  incomingMessages: Message[] = []
) => {
  const newPrevious =
    previousMessages.length >= NUMBER_OF_PREVIOUS_MESSAGES
      ? previousMessages.slice(
          previousMessages.length - NUMBER_OF_PREVIOUS_MESSAGES
        )
      : previousMessages

  const IS_DESKTOP = window.screen.width >= 1025

  const getUserName = (username?: string) => {
    const AnonymousText = 'Anonymous'

    if (!username) return AnonymousText

    return username.replace('Anonymous', AnonymousText)
  }

  return [...newPrevious, ...incomingMessages].map(
    (value: Message, index: number) => {
      return IS_DESKTOP ? (
        <div key={index} className={styles.chatBubbleContainer}>
          <div className={styles.chatBubble}>
            <div className={styles.chatLayout}>
              <div className={styles.profileIcon}>
                <ProfileIcon size='40' viewBox='0 0 400 400' />
              </div>
              <div className={styles.chatTextContainer}>
                <span className={`${styles.chatUser} t-mini`}>
                  {getUserName(value?.username)}
                </span>
                <span className={`${styles.chatMessage} mv3`}>
                  {value.data}
                </span>
              </div>
              <br />
            </div>
          </div>
        </div>
      ) : (
        <div key={index} className={styles.chatBubbleContainer}>
          <div key={index} className={styles.chatBubble}>
            <span className={`${styles.chatMessage} mv3`}>
              <b>
                {getUserName(value?.username)}
                {': '}
              </b>
              {value.data}
            </span>
          </div>
        </div>
      )
    }
  )
}

export default messageRenderer
