/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import { Feed } from './components/Video/Feed'
import { Chat } from './components/Chat/Chat'
import { Viewers } from './components/Viewers/Viewers'
import { Live } from './components/Live/Live'
import { VerticalProductSlider } from './components/ProductSlider/VerticalProductSlider'
import { useWebSocket } from './hooks/useWebSocket'
import { useLivestreamingConfig } from './hooks/useLivestreamingConfig'
import { useLivestreamingComponentOnScreen } from './hooks/useLivestreamingComponentOnScreen'
import { ButtonProductsMobile } from './components/ProductSlider/ButtonProductsMobile'
import { HorizontalProductSlider } from './components/ProductSlider/HorizontalProductSlider'
import { SliderProductMobile } from './components/ProductSlider/SliderProductMobile'
import { VariationSelector } from './components/ProductVariationSelector/VariationSelector'
import { useIsPlayerSupported } from './hooks'
import { getMobileOS } from './utils'
import type { Message } from './typings/livestreaming'

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
  pdp?: string
  originOfProducts?: string
  kuikpay?: string
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
    inactiveProductsCarousel,
    pdp,
    originOfProducts,
    kuikpay
  } = props

  const divVideoContent = useRef<HTMLDivElement>(null)
  const [showSliderProducts, setShowSliderProducts] = useState(false)
  const [showVariation, setShowVariation] = useState('')

  const [height, setHeight] = useState('0')
  const [width, setWidth] = useState(0)
  const [detector, setDetector] = useState('')
  const [pinnedMessage, setPinnedMessage] = useState<Message | undefined>()
  const [transmitionType, setTransmitionType] = useState<string | undefined>()

  const { isPlayerSupported } = useIsPlayerSupported()

  const {
    wssStream,
    streamUrl,
    collectionId,
    utm,
    emailIsRequired,
    pinnedMessage: initPinnedMessage,
    transmitionType: initTransmitionType,
    recordPath
  } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const { livestreaminComponentInView } = useLivestreamingComponentOnScreen({
    rootMargin: '0px 0px'
  })

  const info = useWebSocket({ wssStream })

  const {
    scriptProperties,
    setScriptProperties,
    setShowCounter,
    setEmailIsRequired,
    socket,
    sessionId,
    pinnedMessage: socketPinnedMessage,
    transmitiontype: socketTransmitiontype
  } = info

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
      time: time === 'undefined' ? 10 : time ? parseInt(time) : 1,
      pdp: pdp === 'undefined' ? false : pdp === 'true',
      kuikpay: kuikpay === 'undefined' ? false : kuikpay === 'true'
    })
  }, [scriptProperties])

  useEffect(() => {
    setEmailIsRequired(emailIsRequired)
  }, [emailIsRequired])

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

  useEffect(() => {
    document.addEventListener('addToCartPortal', () => {
      setTimeout(() => {
        if (!socket || !window.vtexjs) return

        const eventAddToCartStorage = localStorage.getItem(
          'sectionIdClickedOnForAddToCart'
        )

        if (!eventAddToCartStorage) return

        const { productId, productName, sectionIdClickedOn } = JSON.parse(
          eventAddToCartStorage
        )

        socket.send(
          JSON.stringify({
            action: 'sendaddtocart',
            data: {
              name: productName,
              productId
            },
            sectionIdClickedOn,
            orderForm: window.vtexjs.checkout.orderForm.orderFormId,
            sessionId,
            email: ''
          })
        )

        localStorage.removeItem('sectionIdClickedOnForAddToCart')
      }, 1000)
    })
  }, [socket])

  useEffect(() => {
    if (socketPinnedMessage) {
      setPinnedMessage(socketPinnedMessage)
    } else {
      setPinnedMessage(initPinnedMessage)
    }
  }, [initPinnedMessage, socketPinnedMessage])

  useEffect(() => {
    if (socketTransmitiontype) {
      setTransmitionType(socketTransmitiontype)
    } else {
      setTransmitionType(initTransmitionType)
    }
  }, [initTransmitionType, socketTransmitiontype])

  return (
    <div className={styles.livestreaming}>
      <div className={styles.livestreamingContent}>
        <VariationSelector
          showVariation={showVariation}
          setShowVariation={setShowVariation}
          pdp={scriptProperties?.pdp ? scriptProperties?.pdp : false}
          originOfProducts={originOfProducts === '' ? '' : originOfProducts}
        />
        {scriptProperties?.sidebarProducts ||
        scriptProperties?.productsCarousel ? (
          <SliderProductMobile
            collectionId={collectionId}
            infinite={scriptProperties?.infinite}
            time={scriptProperties?.time}
            height={height}
            showSliderProducts={showSliderProducts}
            setShowSliderProducts={setShowSliderProducts}
            pdp={scriptProperties?.pdp ? scriptProperties?.pdp : false}
            originOfProducts={originOfProducts === '' ? '' : originOfProducts}
            setShowVariation={setShowVariation}
            kuikpay={
              scriptProperties?.kuikpay ? scriptProperties?.kuikpay : false
            }
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
              pdp={scriptProperties?.pdp ? scriptProperties?.pdp : false}
              originOfProducts={originOfProducts === '' ? '' : originOfProducts}
              setShowVariation={setShowVariation}
              kuikpay={
                scriptProperties?.kuikpay ? scriptProperties?.kuikpay : false
              }
            />
          )}
        </div>
        <div
          style={{ height: parseInt(height), width: width }}
          className={`${styles.videoContainer} ${
            !scriptProperties?.sidebarProducts && styles.videoContainerChat
          } ${!scriptProperties?.chat && styles.videoContainerProducts} ${
            !scriptProperties?.sidebarProducts &&
            !scriptProperties?.chat &&
            styles.videoContainerFull
          }`}
        >
          <div
            ref={divVideoContent}
            className={styles.fittedContainer}
            style={transmitionType === 'horizontal' ? { width: '100%' } : {}}
          >
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
              <Feed
                activateLike={
                  scriptProperties?.like ? scriptProperties?.like : false
                }
                collectionId={collectionId}
                infoSocket={info}
                isPlayerSupported={isPlayerSupported}
                originOfProducts={
                  originOfProducts === '' ? '' : originOfProducts
                }
                setShowVariation={setShowVariation}
                setWidth={setWidth}
                streamUrl={streamUrl}
                transmitionType={transmitionType}
                recordPath={recordPath}
              />
              <div className={styles.liveContent}>
                <Live infoSocket={info} />
              </div>
              <div className={styles.viewersContent}>
                <Viewers infoSocket={info} />
              </div>
            </div>
            <div className={styles.horizontalProductsContent}>
              {scriptProperties?.productsCarousel && (
                <HorizontalProductSlider
                  collectionId={collectionId}
                  infinite={scriptProperties.infinite}
                  time={scriptProperties.time}
                  pdp={scriptProperties?.pdp ? scriptProperties?.pdp : false}
                  originOfProducts={
                    originOfProducts === '' ? '' : originOfProducts
                  }
                  setShowVariation={setShowVariation}
                  kuikpay={
                    scriptProperties?.kuikpay
                      ? scriptProperties?.kuikpay
                      : false
                  }
                  transmitionType={transmitionType}
                />
              )}
            </div>
          </div>
        </div>
        <div
          style={
            detector === 'unknown'
              ? { height: parseInt(height), maxHeight: parseInt(height) }
              : { height: 'auto' }
          }
          className={`${
            scriptProperties?.chat ? styles.chatContent : styles.displayNone
          }`}
        >
          {scriptProperties?.chat ? (
            !info.isTransmiting && recordPath ? null : (
              <Chat
                title='Chat en vivo'
                placeholder='Comenta aqui...'
                infoSocket={info}
                idLivestreaming={idLivestreaming}
                account={account}
                pinnedMessage={pinnedMessage}
              />
            )
          ) : null}
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
  time: '10',
  pdp: 'true',
  originOfProducts: 'vtex',
  kuikpay: 'false'
}
