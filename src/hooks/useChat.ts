import { useContext, useEffect, useState } from 'react'
import { ActionsContext } from '../context'
import { config } from '../enviroment/config'
import { apiCall } from '../services'
declare interface Props {
  idLivestreaming: string
  account: string
}

export const useChat = ({ idLivestreaming, account }: Props) => {
  const [chatHistory, setChatHistory] = useState<any>([])
  const {
    setting: { environment }
  } = useContext(ActionsContext)

  useEffect(() => {
    let URL = '__GET_CHAT_BY_ID_URL'
    const { GET_CHAT_BY_ID_URL } = config(environment || '')

    if (GET_CHAT_BY_ID_URL && GET_CHAT_BY_ID_URL !== URL) {
      URL = GET_CHAT_BY_ID_URL
    }

    if (!URL) return

    const getChat = async () => {
      const data = await apiCall({
        url: `${URL}?id=${idLivestreaming}&account=${account}`
      })

      setChatHistory(data?.reverse())
    }

    getChat().catch(null)
  }, [idLivestreaming, account])

  return { chatHistory }
}
