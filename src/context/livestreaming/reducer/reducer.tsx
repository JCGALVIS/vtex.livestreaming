import { useReducer } from 'react'
import { livestreamingCtxDefault, LivestreamingCtx } from '../'
import { Message } from '../../../typings/livestreaming'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type Actions =
  | Action<
      'SET_LIVESTREAM_CONFIG',
      { args: { idLivestreaming: string; account: string } }
    >
  | Action<'SET_CHAT_HISTORY', { args: { chatHistory: Message[] } }>
  | Action<'SET_CHAT', { args: { chat: Message[] } }>
  | Action<'SET_HIGHTLIGHT', { args: { productId: string } }>

const reducer = (
  state: LivestreamingCtx,
  action: Actions
): LivestreamingCtx => {
  switch (action.type) {
    case 'SET_LIVESTREAM_CONFIG': {
      const { idLivestreaming, account } = action.args

      return {
        ...state,
        idLivestreaming,
        account
      }
    }

    case 'SET_CHAT_HISTORY': {
      const { chatHistory } = action.args

      return {
        ...state,
        chatHistory
      }
    }

    case 'SET_CHAT': {
      const { chat } = action.args

      return {
        ...state,
        chat
      }
    }

    case 'SET_HIGHTLIGHT': {
      const { productId } = action.args

      return {
        ...state,
        currentHightLightProductId: productId
      }
    }

    default:
      return state
  }
}

function initReducer() {
  return {
    ...livestreamingCtxDefault
  }
}

export const useLivestreamingReducer = () =>
  useReducer(reducer, {}, initReducer)
