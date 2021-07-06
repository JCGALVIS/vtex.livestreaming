import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
declare interface Props {
  idLivestreaming: string
  account: string
}

export const useChat = ({ idLivestreaming, account }: Props) => {
  const [chatHistory, setChatHistory] = useState<any>([])
  const { REACT_APP_GET_CHAT_BY_ID_URL } = process.env

  useEffect(() => {
    if (!REACT_APP_GET_CHAT_BY_ID_URL) return
    const url = `${REACT_APP_GET_CHAT_BY_ID_URL}?id=${idLivestreaming}&account=${account}`

    const getChat = async () => {
      const data = await apiCall({
        url
      })

      setChatHistory(data?.reverse())
    }

    getChat().catch(null)
  }, [idLivestreaming, account])

  return { chatHistory }
}
