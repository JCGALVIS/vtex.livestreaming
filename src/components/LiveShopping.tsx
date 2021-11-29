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

type LiveShoppingProps = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const LiveShopping = (props: LiveShoppingProps) => {
  const { setLoading } = props
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
    status,
    showGifButton
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
      isInGlobalPage,
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
      isInGlobalPage: isInGlobalPage,
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
    <div
      className={`${styles2.livestreaming} ${
        isModalLive && styles2.livestreamingPopoup
      }`}
    >
      <div
        className={`${styles2.livestreamingContainer} ${
          isModalLive && styles2.livestreamingPopoupContainer
        }`}
      >
        <div
          className={`${styles2.livestreamingContent} ${
            isModalLive && styles2.livePopoup
          }`}
          style={
            getMobileOS() === 'unknown' && transmitionType === 'vertical'
              ? { width: 'auto' }
              : {}
          }
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
                transmitionType={transmitionType}
              />
            )}
          </div>
          <div
            style={
              detector === 'unknown'
                ? isModalLive && transmitionType === 'vertical'
                  ? { height: parseInt(height), width: '25vw' }
                  : { height: parseInt(height), width: width }
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
                  {getMobileOS() !== 'unknown' && isModalLive && (
                    <div
                      className={styles2.closePopoup}
                      onClick={() => {
                        setLoading(true)
                        setIsModalLive(false)
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
                  livestreamingStatus={status}
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
            {showChat && (
              <Chat
                infoSocket={info}
                pinnedMessage={pinnedMessage}
                transmitionType={transmitionType}
                initShowGif={showGifButton}
              />
            )}
          </div>
          {getMobileOS() === 'unknown' && isModalLive && (
            <div
              className={styles2.closePopoupDeskotp}
              onClick={() => {
                setLoading(true)
                setIsModalLive(false)
              }}
            >
              <IconClose />
            </div>
          )}
        </div>
        {isModalLive && <div className={styles2.backdropContainer} />}
      </div>
    </div>
  )
}
