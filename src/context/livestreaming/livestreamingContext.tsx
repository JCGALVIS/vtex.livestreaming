/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react'
import type {
  Message,
  HightLightHistoryElement
} from '../../typings/livestreaming'
import type { StreamPlayerType } from '../../typings/MediaPlayer'

export interface LivestreamingCtx {
  idLivestreaming: string
  account: string
  videoEl: React.RefObject<StreamPlayerType>
  chat: Message[]
  chatHistory: Message[]
  highlightHistory: HightLightHistoryElement[]
  currentHightLightProductId: string
  handleSetChat: (chat: Message[]) => void
  host: string
  handleSetHightLight: (productId: string) => void
  playBackStartTime: number
}

export const livestreamingCtxDefault: LivestreamingCtx = {
  idLivestreaming: '',
  account: '',
  videoEl: {
    current: null
  },
  chat: [],
  chatHistory: [],
  host: '',
  handleSetChat: () => null,
  highlightHistory: [],
  currentHightLightProductId: '',
  handleSetHightLight: () => null,
  playBackStartTime: 0
}

export const LivestreamingContext = createContext<LivestreamingCtx>(
  livestreamingCtxDefault
)
export const useLivestreamingContext = () => useContext(LivestreamingContext)
