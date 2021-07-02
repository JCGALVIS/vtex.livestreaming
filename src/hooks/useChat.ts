import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
declare interface Props {
  idLivestreaming: string
  account: string
}

export const useChat = ({ idLivestreaming, account }: Props) => {
  const [chat, setChat] = useState<any>([])

  useEffect(() => {
    const getChat = async () => {
      const data = await apiCall({
        url: `https://x5vzeovx68.execute-api.us-east-1.amazonaws.com/Prod/chat?id=${idLivestreaming}&account=${account}`,
        method: 'GET'
      })
      setChat(data?.info.chat)
    }

    getChat().catch(null)
  }, [])

  return { chatHistory: chat, setChat }
}
