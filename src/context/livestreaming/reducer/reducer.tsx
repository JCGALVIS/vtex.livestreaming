import { useReducer } from 'react'
import { livestreamingCtxDefault, LivestreamingCtx } from '../'
import { Message } from '../../../typings/livestreaming'

type Action<K, V = void> = V extends void ? { type: K } : { type: K } & V

export type Actions =
  | Action<
      'SET_LIVESTREAM_CONFIG',
      { args: { idLivestreaming: string; account: string; host: string } }
    >
  | Action<'SET_CHAT_HISTORY', { args: { chatHistory: Message[] } }>
  | Action<'SET_CHAT', { args: { chat: Message[] } }>

const reducer = (
  state: LivestreamingCtx,
  action: Actions
): LivestreamingCtx => {
  switch (action.type) {
    case 'SET_LIVESTREAM_CONFIG': {
      const { idLivestreaming, account, host } = action.args

      return {
        ...state,
        idLivestreaming,
        account,
        host
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
