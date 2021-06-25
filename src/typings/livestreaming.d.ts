export declare interface Message {
  sessionId?: string
  data?: string
  sendDate?: string
  username?: string
}

export declare interface Heart {
  id: number
  color: string
}

export declare interface IvsRealTime {
  startTime: string
  viewerCount: number
  status: string
}
export declare interface InfoLivestreaming {
  socket: WebSocket
  chat: Message[]
  hearts: Heart
  sessionId: string
  ivsRealTime: IvsRealTime
  showCounter: boolean
  isTransmiting: boolean
  setHearts: React.Dispatch<React.SetStateAction<Heart[]>>
  setChat: React.Dispatch<React.SetStateAction<Message[]>>
  SetIsTransmiting: React.Dispatch<React.SetStateAction<boolean>>
  sendAccountId: () => void
}
