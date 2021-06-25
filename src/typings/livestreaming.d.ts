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

export declare interface InfoLivestreaming {
  socket: WebSocket
  chat: Message[]
  hearts: Heart
  sessionId: string
  setHearts: React.Dispatch<React.SetStateAction<Heart[]>>
  setChat: React.Dispatch<React.SetStateAction<Message[]>>
  sendAccountId: () => void
}
