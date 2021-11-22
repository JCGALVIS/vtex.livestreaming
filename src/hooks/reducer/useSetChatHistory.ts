import { Dispatch, useEffect } from 'react'
import { Actions } from './reducer'
import { apiCall } from '../../services/apiCall'
import { Message } from '../../typings/livestreaming'

export const useSetChatHistory = (
  idLivestreaming: string,
  account: string,
  dispatch: Dispatch<Actions>
) => {
  useEffect(() => {
    let URL = '__GET_CHAT_BY_ID_URL'
    const { GET_CHAT_BY_ID_URL } = process.env

    if (GET_CHAT_BY_ID_URL && GET_CHAT_BY_ID_URL !== URL) {
      URL = GET_CHAT_BY_ID_URL
    }

    if (!URL) return

    const getChat = async () => {
      const { data }: { data: Message[] } = await apiCall({
        url: `${URL}/${account}/${idLivestreaming}`
      })

      if (data) {
        dispatch({
          type: 'SET_CHAT_HISTORY',
          args: {
            chatHistory: data
          }
        })
      }
    }
    getChat().catch(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
