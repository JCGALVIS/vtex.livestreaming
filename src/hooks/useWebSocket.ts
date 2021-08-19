/* eslint-disable no-unused-vars */
import { useEffect, useState, useCallback } from 'react'
import {
  Message,
  Heart,
  IvsRealTime,
  InfoSocket,
  HighlightProduct,
  ScriptProperties
} from './../typings/livestreaming'
import getRandomColor from '../utils/getRandomColor'
import { useSessionId } from './useSessionId'
import { getDeviceType } from '../utils/getMobileOs'
declare interface Props {
  wssStream: string | undefined
}

export const useWebSocket = ({ wssStream }: Props): InfoSocket => {
  const [socket, setSocket] = useState<WebSocket>()
  const [chat, setChat] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [hearts, setHearts] = useState<Heart[]>([])
  const [ivsRealTime, setIvsRealTime] = useState<IvsRealTime | undefined>(
    undefined
  )
  const [showCounter, setShowCounter] = useState<boolean | undefined>()
  const [isTransmiting, setIsTransmiting] = useState(false)
  const [highlightProduct, setHighlightProduct] = useState<
    HighlightProduct | undefined
  >()
  const { sessionId } = useSessionId()
  const [uniqueViewer, setUniqueViewer] = useState(false)
  const [scriptProperties, setScriptProperties] = useState<
    ScriptProperties | undefined
  >()

  const createWebSocket = useCallback(() => {
    if (!wssStream || socket) return
    const connection = new WebSocket(wssStream as string)

    connection.onopen = () => {
      setIsConnected(true)
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
        backgroundWhiteHighlight
      } = JSON.parse(event.data)

      switch (action) {
        case 'sendmessage':
          setChat((prev) => [...prev, { data, username, sendDate }])
          break

        case 'sendlike':
          if (document.hidden) break
          if (!(Math.random() < 0.3)) break
          setHearts((prev) => [
            ...prev,
            {
              id: Date.now(),
              color: getRandomColor()
            }
          ])
          break

        case 'sendivsdatarealtime':
          setIvsRealTime({ startTime, status, viewerCount })
          break

        case 'sendshowCounter':
          setShowCounter(data)
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
            time
          })
          break

        default:
          break
      }
    }

    setSocket(connection)
  }, [wssStream])

  const sendAccountId = useCallback(() => {
    if (!isConnected || !socket) return

    const getId = async () => {
      socket.send(
        JSON.stringify({
          action: 'sendaccountid',
          data: sessionId,
          username: undefined,
          device: getDeviceType()
        })
      )
    }

    getId().catch(null)
  }, [isConnected, socket, isTransmiting, uniqueViewer])

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
    isTransmiting,
    setHearts,
    setChat,
    setIvsRealTime,
    setIsTransmiting,
    sendAccountId,
    highlightProduct,
    scriptProperties,
    setScriptProperties
  }
}
