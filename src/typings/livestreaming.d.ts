import { Queue } from '../utils'

export declare interface Message {
  sessionId?: string
  data?: string
  sendDate?: string
  username?: string
  all?: Boolean
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
  backgroundWhiteHighlight?: string
}

export declare interface ScriptProperties {
  sidebarProducts: boolean | undefined
  productsCarousel: boolean | undefined
  chat: boolean | undefined
  like: boolean | undefined
  infinite: boolean | undefined
  time: number | undefined
  pdp: boolean | undefined
}
export declare interface InfoSocket {
  socket: WebSocket | undefined
  chat: Message[]
  hearts: Heart[]
  sessionId: string
  ivsRealTime: IvsRealTime | undefined
  showCounter: boolean | undefined
  isTransmiting: boolean
  emailIsRequired: boolean | undefined
  question?: Question
  messageToDelete?: Message | undefined
  setHearts: React.Dispatch<React.SetStateAction<Heart[]>>
  setChat: React.Dispatch<React.SetStateAction<Message[]>>
  setIsTransmiting: React.Dispatch<React.SetStateAction<boolean>>
  sendAccountId: (username?: string, email?: string) => void
  setIvsRealTime: React.Dispatch<React.SetStateAction<IvsRealTime | undefined>>
  highlightProduct?: HighlightProduct | undefined
  scriptProperties?: ScriptProperties | undefined
  setScriptProperties: React.Dispatch<
    React.SetStateAction<ScriptProperties | undefined>
  >
  setShowCounter: React.Dispatch<React.SetStateAction<boolean | undefined>>
  setEmailIsRequired: React.Dispatch<React.SetStateAction<boolean | undefined>>
  setQuestion?: React.Dispatch<React.SetStateAction<Question | undefined>>
  queueSocket?: Queue<number> | undefined
  setMessageToDelete: React.Dispatch<React.SetStateAction<Message | undefined>>
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

export declare interface Question {
  answers?: Answer[]
  question?: string
  index?: number
  type?: string
  status?: string
  time?: number
  totalVotes?: number
  date?: number
}
declare interface Answer {
  text: string
  votes: number
}
