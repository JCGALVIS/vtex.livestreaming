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
import { ButtonProductsMobile } from './components/ProductSlider/ButtonProductsMobile'
import { HorizontalProductSlider } from './components/ProductSlider/HorizontalProductSlider'
import { SliderProductMobile } from './components/ProductSlider/SliderProductMobile'
import { getMobileOS } from './utils/getMobileOs'

import styles from './styles.module.css'

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
  const [showSliderProducts, setShowSliderProducts] = useState(false)

  const [height, setHeight] = useState('0')
  const [detector, setDetector] = useState('')

  const { wssStream, streamUrl, collectionId, utm } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const { livestreaminComponentInView } = useLivestreamingComponentOnScreen({
    rootMargin: '0px 0px'
  })

  const info = useWebSocket({ wssStream })

  const { scriptProperties, setScriptProperties, setShowCounter } = info

  const getHeight = () => {
    setDetector(getMobileOS())
    if (divVideoContent.current && divVideoContent.current?.clientHeight > 0)
      setHeight(divVideoContent.current?.clientHeight.toString())
  }

  useEffect(() => {
    getHeight()
    window.addEventListener('resize', function () {
      getHeight()
    })
  }, [info, divVideoContent])

  useEffect(() => {
    if (scriptProperties) return
    setShowCounter(
      inactivateViewers === 'undefined' ? true : inactivateViewers === 'true'
    )
    setScriptProperties({
      sidebarProducts:
        inactiveSidebarProducts === 'undefined'
          ? false
          : inactiveSidebarProducts === 'true',
      productsCarousel:
        inactiveSidebarProducts === 'undefined'
          ? false
          : inactiveProductsCarousel === 'true',
      chat: inactivateChat === 'undefined' ? true : inactivateChat === 'true',
      like: inactivateLike === 'undefined' ? true : inactivateLike === 'true',
      infinite: isInfinite === 'undefined' ? true : isInfinite === 'true',
      time: time === 'undefined' ? 10 : time ? parseInt(time) : 1
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
        {scriptProperties?.sidebarProducts ||
        scriptProperties?.productsCarousel ? (
          <SliderProductMobile
            collectionId={collectionId}
            infinite={scriptProperties?.infinite}
            time={scriptProperties?.time}
            height={height}
            showSliderProducts={showSliderProducts}
            setShowSliderProducts={setShowSliderProducts}
          />
        ) : null}
        <div
          style={{ height: parseInt(height) }}
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
              height={(parseInt(height) - 58).toString()}
            />
          )}
        </div>
        <div
          style={{ height: parseInt(height) }}
          className={`${styles.videoContainer} ${
            !scriptProperties?.sidebarProducts && styles.videoContainerChat
          } ${!scriptProperties?.chat && styles.videoContainerProducts} ${
            !scriptProperties?.sidebarProducts &&
            !scriptProperties?.chat &&
            styles.videoContainerFull
          }`}
        >
          <div ref={divVideoContent} className={styles.fittedContainer}>
            <div className={styles.videoContent}>
              {scriptProperties?.sidebarProducts ||
              scriptProperties?.productsCarousel ? (
                <div className={styles.buttonProductContent}>
                  <ButtonProductsMobile
                    collectionId={collectionId}
                    setShowSliderProducts={setShowSliderProducts}
                  />
                </div>
              ) : null}
              <Video
                infoSocket={info}
                streamUrl={streamUrl}
                collectionId={collectionId}
              />
              <div className={styles.liveContent}>
                <Live infoSocket={info} />
              </div>
              <div className={styles.viewersContent}>
                <Viewers infoSocket={info} />
              </div>
              <div className={styles.likeContent}>
                {scriptProperties?.like && <Like infoSocket={info} />}
              </div>
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
          style={
            detector === 'unknown'
              ? { height: parseInt(height) }
              : { height: 'auto' }
          }
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
  inactiveSidebarProducts: 'false',
  inactiveProductsCarousel: 'false',
  inactivateChat: 'true',
  inactivateLike: 'true',
  inactivateViewers: 'true',
  isInfinite: 'true',
  time: '10'
}
