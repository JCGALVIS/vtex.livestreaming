/* eslint-disable no-unused-vars */
import IconClose from '@vtex/styleguide/lib/icon/Close'
import React, { useEffect, useRef, useState } from 'react'
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
import { useActions, useSettings } from '../context'
import {
  useIsPlayerSupported,
  useLivestreamingComponentOnScreen,
  useLivestreamingConfig,
  usePlayerLayout
} from './../hooks'
import styles from './../styles.module.css'
import type { Message } from './../typings/livestreaming'
import { getMobileOS } from './../utils'
import { Alert } from './commonComponents'
import ShopIcon from './icons/ShopIcon'
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
  const variationSelectorState = useState('')
  const [showVariation, setShowVariation] = variationSelectorState
  const [height, setHeight] = useState('0')
  const [detector, setDetector] = useState('')
  const [pinnedMessage, setPinnedMessage] = useState<Message | undefined>()
  const [transmissionType, setTransmissionType] = useState<string | undefined>()
  const { windowDimensions } = usePlayerLayout(transmissionType)
  const isMobile = windowDimensions.width <= 640
  const { isPlayerSupported } = useIsPlayerSupported()
  const { setting, setSetting } = useActions()

  const {
    addToCart,
    account,
    environment,
    idLivestreaming,
    isInGlobalPage,
    originOfProducts,
    showChat,
    showQuickView,
    showProductsCarousel,
    showSidebarProducts
  } = setting

  const {
    collectionId,
    infoSocket,
    isModalLive,
    showCarouselChatButton: socketShowCarouselChatButton,
    setIsModalLive,
    setShowCarouselChatButton,
    setShowCarouselChat,
    setActivePromo,
    setUpdateLivestreaming
  } = useSettings()

  const {
    streamUrl,
    utm,
    emailIsRequired,
    pinnedMessage: initPinnedMessage,
    transmitionType: initTransmissionType,
    status,
    showGifButton,
    showCarouselChatButton
  } = useLivestreamingConfig({
    id: idLivestreaming,
    account,
    environment
  })

  const { livestreamingComponentInView } = useLivestreamingComponentOnScreen({
    rootMargin: '0px 0px'
  })

  const {
    scriptProperties,
    setShowCounter,
    setEmailIsRequired,
    socket,
    sessionId,
    pinnedMessage: socketPinnedMessage,
    transmitiontype: socketTransmissionType,
    showCarouselChatButton: socketCarouselChatButton,
    activePromo,
    updateLivestreaming,
    showCounter,
    ivsRealTime
  } = infoSocket || {}

  const isTransmitting = ivsRealTime?.status === 'LIVE'

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
      showQuickView,
      productsCarousel,
      sidebarProducts,
      time,
      viewers
    } = scriptProperties

    const viewersFlag = viewers === undefined ? showCounter : viewers

    if (setShowCounter) setShowCounter(viewersFlag)

    setSetting({
      ...setting,
      addToCart,
      account,
      environment,
      idLivestreaming,
      isInGlobalPage: isInGlobalPage,
      isInfinite: infinite,
      kuikpay: kuikpay,
      originOfProducts,
      redirectTo: pdp,
      showChat: chat,
      showLike: like,
      showQuickView,
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
    if (!livestreamingComponentInView || !window.vtexjs) return () => {}
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
  }, [livestreamingComponentInView, utm])

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

      const currentCart = {
        action: 'sendaddtocart',
        data: {
          name: productName,
          productId
        },
        sectionIdClickedOn,
        orderForm: window.vtexjs.checkout.orderForm.orderFormId,
        sessionId,
        email: ''
      }

      if (!sessionStorage.cartCachedOrderFormId) {
        sessionStorage.cartCachedOrderFormId = currentCart.orderForm
      }

      if (currentCart.orderForm !== sessionStorage.cartCachedOrderFormId) {
        socket.send(JSON.stringify(currentCart))
        localStorage.removeItem('sectionIdClickedOnForAddToCart')
      }
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
    if (
      (isTransmitting && transmissionType) ||
      (!initTransmissionType && !socketTransmissionType)
    )
      return

    if (socketTransmissionType) {
      setTransmissionType(socketTransmissionType)
    } else {
      setTransmissionType(initTransmissionType)
    }
  }, [initTransmissionType, socketTransmissionType])

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
    if (!setActivePromo) return
    setActivePromo(activePromo)
  }, [activePromo, setActivePromo])

  useEffect(() => {
    if (!setUpdateLivestreaming) return
    setUpdateLivestreaming(updateLivestreaming)
  }, [updateLivestreaming, setUpdateLivestreaming])

  console.log('transmissionType;', transmissionType)

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
              variationSelectorState={variationSelectorState}
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
                variationSelectorState={variationSelectorState}
                transmitionType={transmissionType}
              />
            )}
          </div>
          <div
            style={
              detector === 'unknown'
                ? isModalLive &&
                  !isInGlobalPage &&
                  transmissionType === 'vertical'
                  ? { height: '100%', width: '25vw' }
                  : { height: '100%' }
                : { width: '100%' }
            }
            className={`${
              transmissionType === 'vertical'
                ? styles2.videoContainerVertical
                : styles2.videoContainer
            } ${
              isModalLive &&
              transmissionType !== 'vertical' &&
              !isInGlobalPage &&
              styles2.videoContainerPopoup
            }`}
          >
            <div
              ref={divVideoContent}
              className={`${
                isModalLive && !isInGlobalPage && styles2.heightPopoup
              } ${styles2.fittedContainer}`}
              style={transmissionType === 'horizontal' ? { width: '100%' } : {}}
            >
              <div
                className={`${
                  isModalLive && !isInGlobalPage && styles2.heightPopoup
                } ${styles2.videoContent}`}
              >
                <Feed
                  isPlayerSupported={isPlayerSupported}
                  variationSelectorState={variationSelectorState}
                  streamUrl={streamUrl}
                  transmitionType={transmissionType}
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
                    variationSelectorState={variationSelectorState}
                    transmitionType={transmissionType}
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
                transmitionType={transmissionType}
                initShowGif={showGifButton}
                livestreamingStatus={status}
              />
            )}
          </div>
          {isMobile && socketShowCarouselChatButton && (
            <div
              role='button'
              tabIndex={0}
              className={styles.playerVideoMobileCarouselButtonPosition}
              onClick={() => {
                if (!setShowCarouselChat) return
                setShowCarouselChat((prev) => !prev)
              }}
            >
              <ShopIcon size='25' viewBox='0 0 170 170' />
            </div>
          )}
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
