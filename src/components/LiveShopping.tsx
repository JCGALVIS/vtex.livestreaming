/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useContext } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { SettingContext } from '../context/SettingContext'
import {
  ButtonProductsMobile,
  Chat,
  Feed,
  HorizontalProductSlider,
  Live,
  SliderProductMobile,
  Spinner,
  VariationSelector,
  VerticalProductSlider,
  Viewers
} from '.'

import {
  useIsPlayerSupported,
  useLivestreamingComponentOnScreen,
  useLivestreamingConfig,
  useWebSocket
} from './../hooks'
import { getMobileOS } from './../utils'
import type { LivestreamingProps, Message } from './../typings/livestreaming'

import styles from './../styles.module.css'
import styles2 from './liveShopping.css'

type MarketingData = {
  utmSource: string | undefined
}

type OrderForm = {
  marketingData: MarketingData
}

export const LiveShopping = (props: LivestreamingProps) => {
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
  const [width, setWidth] = useState<string | number>(0)
  const [detector, setDetector] = useState('')
  const [pinnedMessage, setPinnedMessage] = useState<Message | undefined>()
  const [transmitionType, setTransmitionType] = useState<string | undefined>()
  const [loading, setLoading] = useState(true)

  const { isPlayerSupported } = useIsPlayerSupported()

  const { isModalLive, setIsModalLive } = useContext(SettingContext)

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

  useEffect(() => {
    if (!scriptProperties?.sidebarProducts) {
      setTimeout(() => {
        setLoading(false)
      }, 3000)
    }
  }, [scriptProperties, isModalLive])

  return (
    <div className={styles2.livestreaming}>
      {loading && <Spinner />}
      <div
        className={`${styles2.livestreamingContent} ${
          isModalLive && styles2.livePopoup
        }`}
      >
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
            setLoading={setLoading}
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
              setLoading={setLoading}
              kuikpay={
                scriptProperties?.kuikpay ? scriptProperties?.kuikpay : false
              }
            />
          )}
        </div>
        <div
          style={
            detector === 'unknown'
              ? { height: parseInt(height), width: width }
              : { width: '100%' }
          }
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
            className={`${isModalLive && styles2.heightPopoup} ${
              styles.fittedContainer
            }`}
            style={transmitionType === 'horizontal' ? { width: '100%' } : {}}
          >
            <div
              className={`${isModalLive && styles2.heightPopoup} ${
                styles.videoContent
              }`}
            >
              <div className={styles2.buttonProductContent}>
                {scriptProperties?.sidebarProducts ||
                scriptProperties?.productsCarousel ? (
                  <ButtonProductsMobile
                    collectionId={collectionId}
                    setShowSliderProducts={setShowSliderProducts}
                  />
                ) : null}
                {isModalLive && (
                  <div
                    className={styles2.closePopoup}
                    onClick={() => {
                      setLoading(true)
                      setTimeout(() => {
                        setLoading(false)
                        setIsModalLive(false)
                      }, 3000)
                    }}
                  >
                    <IconClose />
                  </div>
                )}
              </div>
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
          {scriptProperties?.chat && streamUrl && (
            <Chat
              infoSocket={info}
              idLivestreaming={idLivestreaming}
              account={account}
              pinnedMessage={pinnedMessage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
