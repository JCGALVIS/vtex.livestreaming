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

declare interface HighlightProduct {
  productId: string | undefined
  showProduct: boolean | undefined
  collection?: string
  livestreamingId?: string
}
export declare interface InfoSocket {
  socket: WebSocket | undefined
  chat: Message[]
  hearts: Heart[]
  sessionId: string
  ivsRealTime: IvsRealTime | undefined
  showCounter: boolean | undefined
  isTransmiting: boolean
  setHearts: React.Dispatch<React.SetStateAction<Heart[]>>
  setChat: React.Dispatch<React.SetStateAction<Message[]>>
  setIsTransmiting: React.Dispatch<React.SetStateAction<boolean>>
  sendAccountId: () => void
  setIvsRealTime: React.Dispatch<React.SetStateAction<IvsRealTime | undefined>>
  highlightProduct?: HighlightProduct | undefined
}

export declare interface Products {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  isAvailable: boolean
}
