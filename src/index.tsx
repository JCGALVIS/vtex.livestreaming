import React from 'react'
import { Video } from './components/Video/Video'
import { Chat } from './components/Chat/Chat'
import { Like } from './components/Like/Like'
import { Viewers } from './components/Viewers/Viewers'
import { Live } from './components/Live/Live'
import { useWebSocket } from './hooks/useWebSocket'

import styles from './styles.module.css'

type LivestreamingProps = {
  inactivateChat?: boolean
  inactivateLike?: boolean
  inactivateViewers?: boolean
  streamUrl: string
  wssStream: string
}

export const Livestreaming = (props: LivestreamingProps) => {
  const {
    inactivateLike,
    inactivateViewers,
    inactivateChat,
    streamUrl,
    wssStream
  } = props

  const info = useWebSocket(wssStream)

  return (
    <div className={styles.appContent}>
      <div className={styles.videoContainer}>
        <div className={styles.videoContent}>
          <Video infoLivestreaming={info} streamUrl={streamUrl} />
        </div>
        <div className={styles.likeContent}>
          {inactivateLike && <Like infoLivestreaming={info} />}
        </div>
        <div className={styles.viewersContent}>
          {inactivateViewers && <Viewers infoLivestreaming={info} />}
        </div>
        <div className={styles.liveContent}>
          <Live infoLivestreaming={info} />
        </div>
        <div className={styles.chatContent}>
          {inactivateChat && (
            <Chat
              title='Chat'
              placeholder='Ingrese un mensaje'
              infoLivestreaming={info}
            />
          )}
        </div>
      </div>
    </div>
  )
}

Livestreaming.defaultProps = {
  inactivateChat: true,
  inactivateLike: true,
  inactivateViewers: true
}
