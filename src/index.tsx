import React, { useEffect, useRef, useState } from 'react'
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
import { HorizontalProductSlider } from './components/ProductSlider/HorizontalProductSlider'

type LivestreamingProps = {
  account: string
  idLivestreaming: string
  inactiveSidebarProducts?: string
  inactiveProductsCarousel?: string
  inactivateChat?: string
  inactivateLike?: string
  inactivateViewers?: string
  isInfinite?: string
  time?: string
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
    isInfinite,
    time,
    inactiveSidebarProducts,
    inactiveProductsCarousel
  } = props

  const divVideoContent = useRef<HTMLDivElement>(null)

  const [height, setHeight] = useState(0)

  const { wssStream, streamUrl, collectionId, utm } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const { livestreaminComponentInView } = useLivestreamingComponentOnScreen({
    rootMargin: '0px 0px'
  })

  const info = useWebSocket({ wssStream })

  const { scriptProperties, setScriptProperties, showCounter } = info

  const getHeight = () => {
    if (divVideoContent.current && divVideoContent.current?.clientHeight > 0)
      setHeight(divVideoContent.current?.clientHeight)
  }

  useEffect(() => {
    getHeight()
    window.addEventListener('resize', function () {
      getHeight()
    })
  }, [info, divVideoContent])

  useEffect(() => {
    if (scriptProperties) return
    setScriptProperties({
      sidebarProducts: inactiveSidebarProducts === 'true',
      productsCarousel: inactiveProductsCarousel === 'true',
      chat: inactivateChat === 'true',
      like: inactivateLike === 'true',
      infinite: isInfinite === 'true',
      time: time ? parseInt(time) : 0
    })
  }, [scriptProperties])

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
        <div
          style={{ height: height }}
          className={`${
            scriptProperties?.sidebarProducts
              ? styles.sliderProductContent
              : styles.displayNone
          }`}
        >
          {scriptProperties?.sidebarProducts && (
            <VerticalProductSlider
              collectionId={collectionId}
              infinite={scriptProperties.infinite}
              time={scriptProperties.time}
              height={height - 58}
            />
          )}
        </div>
        <div
          style={{ height: height }}
          className={`${styles.videoContainer} ${
            !scriptProperties?.sidebarProducts && styles.videoContainerChat
          } ${!scriptProperties?.chat && styles.videoContainerProducts} ${
            !scriptProperties?.sidebarProducts &&
            !scriptProperties?.chat &&
            styles.videoContainerFull
          }`}
        >
          <div ref={divVideoContent} className={styles.videoContent}>
            <Video
              infoSocket={info}
              streamUrl={streamUrl}
              collectionId={collectionId}
            />
            <div className={styles.liveContent}>
              <Live infoSocket={info} />
            </div>
            <div className={styles.viewersContent}>
              {inactivateViewers === 'true' || showCounter ? (
                <Viewers infoSocket={info} />
              ) : null}
            </div>
            <div className={styles.likeContent}>
              {scriptProperties?.like && <Like infoSocket={info} />}
            </div>
            <div className={styles.horizontalProductsContent}>
              {scriptProperties?.productsCarousel && (
                <HorizontalProductSlider
                  collectionId={collectionId}
                  infinite={scriptProperties.infinite}
                  time={scriptProperties.time}
                />
              )}
            </div>
          </div>
        </div>
        <div
          style={{ height: height }}
          className={`${
            scriptProperties?.chat ? styles.chatContent : styles.displayNone
          }`}
        >
          {scriptProperties?.chat && (
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
  inactiveSidebarProducts: 'true',
  inactiveProductsCarousel: 'false',
  inactivateChat: 'true',
  inactivateLike: 'true',
  inactivateViewers: 'true',
  isInfinite: 'true',
  time: '10'
}
