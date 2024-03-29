/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import {
  Message,
  Heart,
  IvsRealTime,
  InfoSocket,
  HighlightProduct,
  ScriptProperties,
  Question,
  Product,
  PromotionTrigger
} from './../typings/livestreaming'
import { useSessionId } from './useSessionId'
import { getDeviceType, getRandomColor, Queue } from '../utils'
import { v4 as uuidv4 } from 'uuid'

declare interface Props {
  wssStream: string | undefined
}

const useWebSocket = ({ wssStream }: Props): InfoSocket => {
  const [socket, setSocket] = useState<WebSocket>()
  const [chat, setChat] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [ivsRealTime, setIvsRealTime] = useState<IvsRealTime | undefined>(
    undefined
  )
  const [showCounter, setShowCounter] = useState<boolean | undefined>(true)
  const [showGif, setShowGif] = useState<boolean | undefined>()
  const [showLoader, setShowLoader] = useState<boolean>(false)
  const [showCarouselChatButton, setShowCarouselChatButton] = useState<
    boolean | undefined
  >()
  const [isTransmiting, setIsTransmiting] = useState(false)
  const [highlightProduct, setHighlightProduct] = useState<
    HighlightProduct | undefined
  >()
  const { sessionId } = useSessionId()
  const [uniqueViewer, setUniqueViewer] = useState(false)
  const [scriptProperties, setScriptProperties] = useState<
    ScriptProperties | undefined
  >()
  const [emailIsRequired, setEmailIsRequired] = useState<boolean | undefined>()
  const [question, setQuestion] = useState<Question>()
  const [queueSocket, setQueueSocket] = useState<Queue<number> | undefined>()
  const [messageToDelete, setMessageToDelete] = useState<Message | undefined>()
  const [pinnedMessage, setPinnedMessage] = useState<Message | undefined>()
  const [transmitiontype, setTransmitiontype] = useState<string | undefined>()
  const [productsInCart, setProductsInCart] = useState<Product[]>([])
  const [activePromo, setActivePromo] = useState<PromotionTrigger>()
  const [updateLivestreaming, setUpdateLivestreaming] = useState<string>()

  const createWebSocket = useCallback(() => {
    let queueSocketInit: Queue<number>
    if (!wssStream || socket) return
    const connection = new WebSocket(wssStream as string)

    connection.onopen = () => {
      setIsConnected(true)
      queueSocketInit = new Queue()
      setQueueSocket(queueSocketInit)
    }

    connection.onclose = () => {
      setIsConnected(false)
      setSocket(undefined)
      createWebSocket()
    }

    connection.onerror = () => {
      connection.close()
    }

    connection.onmessage = (event: MessageEvent) => {
      const {
        action,
        data,
        sendDate,
        username,
        startTime,
        viewerCount,
        showGifButton,
        status,
        productId,
        showProduct,
        collection,
        livestreamingId,
        sidebarProducts,
        productsCarousel,
        chat,
        like,
        infinite,
        time,
        backgroundWhiteHighlight,
        pdp,
        emailIsRequired,
        kuikpay,
        isAdmin,
        responseAdmin,
        isInGlobalPage,
        type,
        showQuickView,
        showCarouselChatButton,
        viewers,
        trigger
      } = JSON.parse(event.data)

      switch (action) {
        case 'sendmessage':
          setChat((prev) => [
            {
              data,
              username,
              sendDate,
              isAdmin,
              responseAdmin,
              type,
              color:
                prev.find((i) => i.username === username)?.color ||
                getRandomColor()
            },
            ...prev
          ])
          setShowLoader(false)
          break

        case 'sendlike':
          if (document.hidden) break
          if (queueSocketInit.size() <= 4) {
            const id = Date.now()

            setHearts((prev) => [
              ...prev,
              {
                id,
                color: getRandomColor()
              }
            ])
            queueSocketInit.add(id)
          }
          break

        case 'sendivsdatarealtime':
          setIvsRealTime({ startTime, status, viewerCount })
          break

        case 'sendshowCounter':
          setShowCounter(data)
          setShowGif(showGifButton)
          setEmailIsRequired(emailIsRequired)
          setShowCarouselChatButton(showCarouselChatButton)
          break

        case 'sendhighlightproduct':
          setHighlightProduct({
            productId,
            showProduct,
            collection,
            livestreamingId,
            backgroundWhiteHighlight
          })
          break

        case 'sendPropertiesToCms':
          setScriptProperties({
            sidebarProducts,
            productsCarousel,
            chat,
            like,
            infinite,
            time,
            showQuickView,
            pdp,
            kuikpay,
            isInGlobalPage,
            viewers
          })
          break

        case 'sendquestion':
          data.date = Date.now()
          setQuestion(data)
          break

        case 'senddeletemessage':
          setMessageToDelete(data)
          break

        case 'sendpinmessage':
          setPinnedMessage(data)
          break

        case 'sendunpinmessage':
          setPinnedMessage({})
          break

        case 'sendtransmitiontype':
          setTransmitiontype(data)
          break
        case 'sendaddtocart':
          setProductsInCart((prev) => [
            ...prev,
            {
              id: '',
              name: '',
              price: 0,
              priceWithDiscount: 0,
              imageUrl: data.imageUrl,
              addToCartLink: '',
              items: [],
              isAvailable: false,
              variationSelector: [],
              pdpLink: '',
              skuId: ''
            }
          ])
          break
        case 'sendactivepromotion':
          setActivePromo(trigger)
          setTimeout(() => {
            setActivePromo(undefined)
          }, 65000)
          break
        case 'sendupdatelivestreaming':
          setUpdateLivestreaming(uuidv4())
          break

        default:
          break
      }
    }

    setSocket(connection)
  }, [wssStream])

  const sendAccountId = useCallback(
    (username?: string, email?: string) => {
      if (!isConnected || !socket) return

      const getId = async () => {
        socket.send(
          JSON.stringify({
            action: 'sendaccountid',
            data: sessionId,
            username: username,
            device: getDeviceType(),
            email: email
          })
        )
      }

      getId().catch(null)
    },
    [isConnected, socket, isTransmiting, uniqueViewer]
  )

  useEffect(() => {
    if (!socket) return () => {}

    return () => {
      socket.close()
    }
  }, [socket])

  useEffect(() => {
    createWebSocket()
  }, [createWebSocket])

  useEffect(() => {
    if (sendAccountId) {
      sendAccountId()
    }
  }, [sendAccountId])

  useEffect(() => {
    setIsTransmiting(ivsRealTime?.status === 'LIVE')
  }, [ivsRealTime?.status])

  useEffect(() => {
    setTimeout(() => {
      setUniqueViewer(true)
    }, 10000)
  }, [])

  return {
    socket,
    chat,
    sessionId,
    hearts,
    ivsRealTime,
    showCounter,
    showGif,
    showLoader,
    setShowLoader,
    isTransmiting,
    emailIsRequired,
    highlightProduct,
    scriptProperties,
    question,
    messageToDelete,
    setHearts,
    setChat,
    setIvsRealTime,
    setIsTransmiting,
    sendAccountId,
    setScriptProperties,
    setShowCounter,
    setEmailIsRequired,
    setQuestion,
    queueSocket,
    setMessageToDelete,
    pinnedMessage,
    transmitiontype,
    productsInCart,
    setProductsInCart,
    setQueueSocket,
    showCarouselChatButton,
    activePromo,
    updateLivestreaming
  }
}

export default useWebSocket
