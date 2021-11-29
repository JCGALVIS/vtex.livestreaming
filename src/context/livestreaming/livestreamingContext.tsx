import { createContext, useContext } from 'react'
import { Message } from '../../typings/livestreaming'
import { StreamPlayerType } from '../../typings/MediaPlayer'

export interface LivestreamingCtx {
  idLivestreaming: string
  account: string
  videoEl: React.RefObject<StreamPlayerType>
  chat: Message[]
  chatHistory: Message[]
  handleSetChat: (chat: Message[]) => void
}

export const livestreamingCtxDefault: LivestreamingCtx = {
  idLivestreaming: '',
  account: '',
  videoEl: {
    current: null
  },
  chat: [],
  chatHistory: [],
  handleSetChat: () => null
}

export const LivestreamingContext = createContext<LivestreamingCtx>(
  livestreamingCtxDefault
)
export const useLivestreamingContext = () => useContext(LivestreamingContext)
