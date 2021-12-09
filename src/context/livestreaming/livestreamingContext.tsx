import { createContext, useContext } from 'react'
import { Message, HightLightHistoryElement } from '../../typings/livestreaming'
import { StreamPlayerType } from '../../typings/MediaPlayer'

export interface LivestreamingCtx {
  idLivestreaming: string
  account: string
  videoEl: React.RefObject<StreamPlayerType>
  chat: Message[]
  chatHistory: Message[]
  hightLightHistory: HightLightHistoryElement[]
  currentHightLightProductId: string
  handleSetChat: (chat: Message[]) => void
  handleSetHightLight: (productId: string) => void
}

export const livestreamingCtxDefault: LivestreamingCtx = {
  idLivestreaming: '',
  account: '',
  videoEl: {
    current: null
  },
  chat: [],
  chatHistory: [],
  handleSetChat: () => null,
  hightLightHistory: [],
  currentHightLightProductId: '',
  handleSetHightLight: () => null
}

export const LivestreamingContext = createContext<LivestreamingCtx>(
  livestreamingCtxDefault
)
export const useLivestreamingContext = () => useContext(LivestreamingContext)
