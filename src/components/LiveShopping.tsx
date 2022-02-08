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
  useLivestreamingConfig
} from './../hooks'
import { getMobileOS } from './../utils'
import type { Message } from './../typings/livestreaming'

import styles from './../styles.module.css'
import styles2 from './liveShopping.css'
import { Alert } from './commonComponents'
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
  const [detector, setDetector] = useState('')
  const [pinnedMessage, setPinnedMessage] = useState<Message | undefined>()
  const [transmitionType, setTransmitionType] = useState<string | undefined>()

  const { isPlayerSupported } = useIsPlayerSupported()

  const {
    setting: {
      account,
      idLivestreaming,
      isInGlobalPage,
      originOfProducts,
      showChat,
      showQuickView,
      showProductsCarousel,
      showSidebarProducts,
      showViewers
    },
    setSetting
  } = useContext(ActionsContext)

  const {
    infoSocket,
    isModalLive,
    setIsModalLive,
    setShowCarouselChatButton,
    setActivePromoMessage
  } = useContext(SettingContext)

  const {
    collectionId,
    streamUrl,
    utm,
    emailIsRequired,
    pinnedMessage: initPinnedMessage,
    transmitionType: initTransmitionType,
    status,
    showGifButton,
    showCarouselChatButton
  } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const { livestreaminComponentInView } = useLivestreamingComponentOnScreen({
    rootMargin: '0px 0px'
  })

  const {
    scriptProperties,
    setShowCounter,
    setEmailIsRequired,
    socket,
    sessionId,
    pinnedMessage: socketPinnedMessage,
    transmitiontype: socketTransmitiontype,
    showCarouselChatButton: socketCarouselChatButton,
    activePromoMessage
  } = infoSocket || {}

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
  }, [infoSocket, divVideoContent])

  useEffect(() => {
    if (!scriptProperties) return
    const {
      chat,
      isInGlobalPage,
      infinite,
      kuikpay,
      like,
      pdp,
      quickView,
      productsCarousel,
      sidebarProducts,
      time,
      viewers
    } = scriptProperties

    const viewersFlag = viewers || showViewers

    if (setShowCounter) setShowCounter(viewersFlag)

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
      showQuickView: quickView,
      showProductsCarousel: productsCarousel,
      showSidebarProducts: sidebarProducts,
      showViewers: viewersFlag,
      time
    })
  }, [scriptProperties])

  useEffect(() => {
    if (setEmailIsRequired) setEmailIsRequired(emailIsRequired)
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
    if (setShowCarouselChatButton) {
      if (socketCarouselChatButton !== undefined) {
        setShowCarouselChatButton(socketCarouselChatButton)
      } else {
        if (showCarouselChatButton)
          setShowCarouselChatButton(showCarouselChatButton)
      }
    }
  }, [showCarouselChatButton, socketCarouselChatButton])

  useEffect(() => {
    setActivePromoMessage(activePromoMessage)
  }, [activePromoMessage, setActivePromoMessage])

  return (
    <div
      className={`${styles2.livestreaming} ${
        isModalLive && !isInGlobalPage && styles2.livestreamingPopoup
      }`}
    >
      <Alert />
      <div
        className={`${styles2.livestreamingContainer} ${
          isModalLive && !isInGlobalPage && styles2.livestreamingPopoupContainer
        }`}
      >
        <div
          className={`${styles2.livestreamingContent} ${
            isModalLive && !isInGlobalPage && styles2.livePopoup
          }`}
          style={getMobileOS() === 'unknown' ? { width: 'auto' } : {}}
        >
          {showQuickView && (
            <VariationSelector
              showVariation={showVariation}
              setShowVariation={setShowVariation}
            />
          )}
          {showSidebarProducts || showProductsCarousel ? (
            <SliderProductMobile
              height={height}
              showSliderProducts={showSliderProducts}
              setShowSliderProducts={setShowSliderProducts}
              setShowVariation={setShowVariation}
            />
          ) : null}
          <div
            style={{ height: parseInt(height) }}
            className={`${
              showSidebarProducts && collectionId
                ? styles2.sliderProductContent
                : styles2.displayNone
            } ${isModalLive && styles2.flexAuto}`}
          >
            {showSidebarProducts && (
              <VerticalProductSlider
                height={(parseInt(height) - 58).toString()}
                setShowVariation={setShowVariation}
                transmitionType={transmitionType}
              />
            )}
          </div>
          <div
            style={
              detector === 'unknown'
                ? isModalLive &&
                  !isInGlobalPage &&
                  transmitionType === 'vertical'
                  ? { height: '100%', width: '25vw' }
                  : { height: '100%' }
                : { width: '100%' }
            }
            className={`${
              transmitionType === 'vertical'
                ? styles2.videoContainerVertical
                : styles2.videoContainer
            } ${
              isModalLive &&
              transmitionType !== 'vertical' &&
              !isInGlobalPage &&
              styles2.videoContainerPopoup
            }`}
          >
            <div
              ref={divVideoContent}
              className={`${
                isModalLive && !isInGlobalPage && styles2.heightPopoup
              } ${styles2.fittedContainer}`}
              style={transmitionType === 'horizontal' ? { width: '100%' } : {}}
            >
              <div
                className={`${
                  isModalLive && !isInGlobalPage && styles2.heightPopoup
                } ${styles2.videoContent}`}
              >
                <Feed
                  isPlayerSupported={isPlayerSupported}
                  setShowVariation={setShowVariation}
                  streamUrl={streamUrl}
                  transmitionType={transmitionType}
                  livestreamingStatus={status}
                />
                <div className={styles2.feedHeader}>
                  <div className={styles2.leftHeader}>
                    <Live />
                    <Viewers />
                  </div>
                  <div className={styles2.rightHeader}>
                    {showSidebarProducts || showProductsCarousel ? (
                      <ButtonProductsMobile
                        setShowSliderProducts={setShowSliderProducts}
                      />
                    ) : null}
                    {getMobileOS() !== 'unknown' &&
                      isModalLive &&
                      !isInGlobalPage && (
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
                </div>
              </div>
              <div className={styles.horizontalProductsContent}>
                {showProductsCarousel && !isModalLive && (
                  <HorizontalProductSlider
                    setShowVariation={setShowVariation}
                    transmitionType={transmitionType}
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className={`${
              showChat ? styles2.chatContent : styles2.displayNone
            } ${isModalLive && styles2.flexAuto}`}
            style={
              getMobileOS() === 'unknown'
                ? { height: parseInt(height) }
                : { height: 'auto' }
            }
          >
            {showChat && (
              <Chat
                pinnedMessage={pinnedMessage}
                transmitionType={transmitionType}
                initShowGif={showGifButton}
              />
            )}
          </div>
          {getMobileOS() === 'unknown' && isModalLive && !isInGlobalPage && (
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
        {isModalLive && !isInGlobalPage && (
          <div className={styles2.backdropContainer} />
        )}
      </div>
    </div>
  )
}
