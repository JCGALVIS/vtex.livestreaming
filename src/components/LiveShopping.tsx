/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useContext } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { SettingContext } from '../context/SettingContext'
import { ActionsContext } from '../context/ActionsContext'
import {
  ButtonProductsMobile,
  Chat,
  Feed,
  HorizontalProductSlider,
  Live,
  SliderProductMobile,
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
import type { Message } from './../typings/livestreaming'

import styles from './../styles.module.css'
import styles2 from './liveShopping.css'

type MarketingData = {
  utmSource: string | undefined
}

type OrderForm = {
  marketingData: MarketingData
}

export const LiveShopping = () => {
  const divVideoContent = useRef<HTMLDivElement>(null)
  const [showSliderProducts, setShowSliderProducts] = useState(false)
  const [showVariation, setShowVariation] = useState('')
  const [height, setHeight] = useState('0')
  const [width, setWidth] = useState<string | number>(0)
  const [detector, setDetector] = useState('')
  const [pinnedMessage, setPinnedMessage] = useState<Message | undefined>()
  const [transmitionType, setTransmitionType] = useState<string | undefined>()

  const { isPlayerSupported } = useIsPlayerSupported()

  const {
    setting: {
      account,
      idLivestreaming,
      originOfProducts,
      showChat,
      showProductsCarousel,
      showSidebarProducts,
      showViewers
    },
    setSetting
  } = useContext(ActionsContext)

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
    if (!scriptProperties) return
    const {
      chat,
      infinite,
      kuikpay,
      like,
      pdp,
      productsCarousel,
      sidebarProducts,
      time
    } = scriptProperties

    setShowCounter(showViewers)
    setSetting({
      account,
      idLivestreaming,
      isInfinite: infinite,
      kuikpay: kuikpay,
      originOfProducts,
      redirectTo: pdp,
      showChat: chat,
      showLike: like,
      showProductsCarousel: productsCarousel,
      showSidebarProducts: sidebarProducts,
      showViewers,
      time
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
  return (
    <div className={styles2.livestreaming}>
      <div
        className={`${styles2.livestreamingContent} ${
          isModalLive && styles2.livePopoup
        }`}
      >
        <VariationSelector
          showVariation={showVariation}
          setShowVariation={setShowVariation}
        />
        {showSidebarProducts || showProductsCarousel ? (
          <SliderProductMobile
            collectionId={collectionId}
            height={height}
            showSliderProducts={showSliderProducts}
            setShowSliderProducts={setShowSliderProducts}
            setShowVariation={setShowVariation}
          />
        ) : null}
        <div
          style={{ height: parseInt(height) }}
          className={`${
            showSidebarProducts
              ? styles.sliderProductContent
              : styles.displayNone
          }`}
        >
          {showSidebarProducts && (
            <VerticalProductSlider
              collectionId={collectionId}
              height={(parseInt(height) - 58).toString()}
              setShowVariation={setShowVariation}
            />
          )}
        </div>
        <div
          style={
            detector === 'unknown'
              ? { height: parseInt(height), width: width }
              : { width: '100%' }
          }
          className={styles.videoContainer}
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
                {showSidebarProducts || showProductsCarousel ? (
                  <ButtonProductsMobile
                    collectionId={collectionId}
                    setShowSliderProducts={setShowSliderProducts}
                  />
                ) : null}
                {isModalLive && (
                  <div
                    className={styles2.closePopoup}
                    onClick={() => {
                      setTimeout(() => {
                        setIsModalLive(false)
                      }, 3000)
                    }}
                  >
                    <IconClose />
                  </div>
                )}
              </div>
              <Feed
                collectionId={collectionId}
                infoSocket={info}
                isPlayerSupported={isPlayerSupported}
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
              {showProductsCarousel && (
                <HorizontalProductSlider
                  collectionId={collectionId}
                  setShowVariation={setShowVariation}
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
          className={`${showChat ? styles.chatContent : styles.displayNone}`}
        >
          {showChat && streamUrl && (
            <Chat infoSocket={info} pinnedMessage={pinnedMessage} />
          )}
        </div>
      </div>
    </div>
  )
}
