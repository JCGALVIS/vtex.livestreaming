/* eslint-disable no-unused-vars */
import React from 'react'
import tinyColor from 'tinycolor2'

import type { Message } from '../../typings/livestreaming'
import styles from './chat.css'

const messageRenderer = (chatFiltered: Message[]) => {
  const IS_DESKTOP = window.screen.width >= 1025

  const getUserName = (username?: string) => {
    const AnonymousText = 'Anonymous'

    if (!username) return AnonymousText

    return username.replace('Anonymous', AnonymousText)
  }

  return chatFiltered.map((value: Message, index: number) => {
    const isAdmin = value?.isAdmin
    const userName = getUserName(value?.username)
    const backgroundColor = `${value.color || '#000000'}66`

    const color = tinyColor(backgroundColor).isLight() ? '#323845' : '#fff'

    return IS_DESKTOP ? (
      <div key={index} className={styles.chatBubbleContainer}>
        <div
          className={`${styles.chatBubble} ${
            isAdmin && styles.chatBubbleAdmin
          }`}
        >
          <div className={styles.chatLayout}>
            <div className={styles.profileIcon}>
              <div className={styles.initialName} style={{ backgroundColor }}>
                <span style={{ color }}>{userName[0]}</span>
              </div>
              <span className={`${styles.chatUser} t-mini`}>{userName}</span>
            </div>
            <div className={styles.chatTextContainer}>
              <span className={`${styles.chatMessage} mv3`}>{value.data}</span>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div key={index} className={styles.chatBubbleContainer}>
        <div
          key={index}
          className={`${styles.chatBubble} ${
            isAdmin && styles.chatBubbleAdmin
          }`}
        >
          <span className={`${styles.chatMessage} mv3`}>
            <b>
              {userName}
              {': '}
            </b>
            {value.data}
          </span>
        </div>
      </div>
    )
  })
}

export default messageRenderer
