import { useEffect, useState, useCallback } from 'react'
import { uuid } from 'uuidv4'
// eslint-disable-next-line no-unused-vars
import { Message, Heart } from './../typings/livestreaming'
import getRandomColor from '../utils/getRandomColor'

const wssStream = 'wss://yentxtbxy1.execute-api.us-east-1.amazonaws.com/Prod'

export const useWebSocket = () => {
  const [socket, setSocket] = useState<WebSocket>()
  const [chat, setChat] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [sessionId, setSessionId] = useState('')
  const [hearts, setHearts] = useState<Heart[]>([])

  const createWebSocket = useCallback(() => {
    if (!wssStream && socket) return

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
      const { action, data, sendDate, username } = JSON.parse(event.data)

      switch (action) {
        case 'sendmessage':
          setChat((prev) => [...prev, { data, username, sendDate }])
          break

        case 'sendlike':
          if (document.hidden) break
          setHearts((prev) => [
            ...prev,
            {
              id: Date.now(),
              color: getRandomColor()
            }
          ])
          break

        default:
          break
      }
    }

    setSocket(connection)
  }, [wssStream])

  const sendAccountId = useCallback(() => {
    if (!isConnected || !socket) return
    const id = uuid()
    socket.send(
      JSON.stringify({
        action: 'sendaccountid',
        data: id,
        username: undefined
      })
    )
    setSessionId(id)
  }, [isConnected, socket])

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

  return {
    socket,
    chat,
    sessionId,
    hearts,
    setHearts,
    setChat,
    sendAccountId
  }
}
