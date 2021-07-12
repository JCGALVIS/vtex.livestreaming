import React from 'react'
import { Video } from './components/Video/Video'
import { Chat } from './components/Chat/Chat'
import { Like } from './components/Like/Like'
import { Viewers } from './components/Viewers/Viewers'
import { Live } from './components/Live/Live'
import { useWebSocket } from './hooks/useWebSocket'
import { useLivestreamingConfig } from './hooks/useLivestreamingConfig'

import styles from './styles.module.css'

type LivestreamingProps = {
  inactivateChat?: boolean
  inactivateLike?: boolean
  inactivateViewers?: boolean
  idLivestreaming: string
  account: string
}

export const Livestreaming = (props: LivestreamingProps) => {
  const {
    inactivateLike,
    inactivateViewers,
    inactivateChat,
    idLivestreaming,
    account
  } = props

  const { wssStream, streamUrl } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })
  const info = useWebSocket({ wssStream })

  return (
    <div className={styles.livestreaming}>
      <div className={styles.livestreamingContent}>
        <div className={styles.videoContainer}>
          <div className={styles.videoContent}>
            <Video infoSocket={info} streamUrl={streamUrl} />
            <div className={styles.liveContent}>
              <Live infoSocket={info} />
            </div>
            <div className={styles.viewersContent}>
              {inactivateViewers && <Viewers infoSocket={info} />}
            </div>
            <div className={styles.likeContent}>
              {inactivateLike && <Like infoSocket={info} />}
            </div>
          </div>
        </div>
        <div className={styles.chatContent}>
          {inactivateChat && (
            <Chat
              title='Chat'
              placeholder='Ingrese un mensaje'
              infoSocket={info}
              idLivestreaming={idLivestreaming}
              account={account}
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
