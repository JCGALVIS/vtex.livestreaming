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
import { VariationSelector } from './components/ProductVariationSelector/VariationSelector'
import { getMobileOS } from './utils'
import { calcHeightApp } from './utils'

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
  const [detector, setDetector] = useState('')
  const [heightPlayerUI, setHeightPlayerUI] = useState<number>(0)

  const { wssStream, streamUrl, collectionId, utm, emailIsRequired } =
    useLivestreamingConfig({
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
    sessionId
  } = info

  const mobileOS = getMobileOS()

  useEffect(() => {
    setDetector(getMobileOS())
  }, [mobileOS])

  const getHeight = () => {
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

        const sectionIdClickedOn = localStorage.getItem(
          'sectionIdClickedOnForAddToCart'
        )

        socket.send(
          JSON.stringify({
            action: 'sendaddtocart',
            data: undefined,
            sectionIdClickedOn,
            orderForm: window.vtexjs.checkout.orderForm.orderFormId,
            sessionId,
            email: ''
          })
        )

        localStorage.removeItem('sectionIdClickedOnForAddToCart')
      }, 2000)
    })
  }, [])

  useEffect(() => {
    if (!detector) return
    setHeightPlayerUI(calcHeightApp())
  }, [detector])

  return (
    <div className={`live-shopping-app ${styles.livestreaming}`}>
      <div
        className={styles.livestreamingContent}
        style={{
          height: detector !== 'unknown' ? `${heightPlayerUI}px` : ''
        }}
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
                pdp={scriptProperties?.pdp ? scriptProperties?.pdp : false}
                originOfProducts={
                  originOfProducts === '' ? '' : originOfProducts
                }
                setShowVariation={setShowVariation}
                kuikpay={
                  scriptProperties?.kuikpay ? scriptProperties?.kuikpay : false
                }
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
          {scriptProperties?.chat && (
            <Chat
              title='Chat'
              placeholder='Comenta aqui...'
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
  time: '10',
  pdp: 'true',
  originOfProducts: 'vtex',
  kuikpay: 'false'
}
