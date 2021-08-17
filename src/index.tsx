import React, { useEffect } from 'react'
import { Video } from './components/Video/Video'
import { Chat } from './components/Chat/Chat'
import { Like } from './components/Like/Like'
import { Viewers } from './components/Viewers/Viewers'
import { Live } from './components/Live/Live'
import { VerticalProductSlider } from './components/ProductSlider/VerticalProductSlider'
import { useWebSocket } from './hooks/useWebSocket'
import { useLivestreamingConfig } from './hooks/useLivestreamingConfig'
import { useLivestreamingComponentOnScreen } from './hooks/useLivestreamingComponentOnScreen'
import styles from './styles.module.css'
import HighlightProduct from './components/HighlightProduct/HighlightProduct'
import { HorizontalProductSlider } from './components/ProductSlider/HorizontalProductSlider'

type LivestreamingProps = {
  inactivateChat?: boolean
  inactivateLike?: boolean
  inactivateViewers?: boolean
  idLivestreaming: string
  account: string
  infinite?: boolean
}

type MarketingData = {
  utmSource: string | undefined
}

type OrderForm = {
  marketingData: MarketingData
}

export const Livestreaming = (props: LivestreamingProps) => {
  const {
    inactivateLike,
    inactivateViewers,
    inactivateChat,
    idLivestreaming,
    account,
    infinite = true
  } = props

  const { wssStream, streamUrl, collectionId, utm } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const { livestreaminComponentInView } = useLivestreamingComponentOnScreen({
    rootMargin: '0px 0px'
  })

  const info = useWebSocket({ wssStream })

  useEffect(() => {
    if (!livestreaminComponentInView || !window.vtexjs) return () => {}
    const setUTM = setTimeout(() => {
      window.vtexjs.checkout
        .getOrderForm()
        .then(function (orderForm: OrderForm) {
          var marketingData = orderForm.marketingData
          marketingData = {
            utmSource: utm
          }
          return window.vtexjs.checkout.sendAttachment(
            'marketingData',
            marketingData
          )
        })
    }, 10000)

    return () => clearTimeout(setUTM)
  }, [livestreaminComponentInView, utm])

  return (
    <div className={styles.livestreaming}>
      <div className={styles.livestreamingContent}>
        <div className={styles.sliderProductContent}>
          <VerticalProductSlider
            collectionId={collectionId}
            infinite={infinite}
            time={10}
          />
        </div>
        <div className={styles.videoContainer}>
          <div className={styles.videoContent}>
            {collectionId && (
              <HighlightProduct infoSocket={info} collectionId={collectionId} />
            )}
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
            <div className={styles.horizontalProductsContent}>
              <HorizontalProductSlider collectionId={collectionId} />
            </div>
          </div>
        </div>
        <div className={styles.chatContent}>
          {inactivateChat && (
            <Chat
              title='Chat'
              placeholder='Di algo...'
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
