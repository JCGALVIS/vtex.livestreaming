/* eslint-disable no-unused-vars */
import { Queue } from '../utils'

type LivestreamingProps = {
  account: string
  getProducts?: (collectionId?: string) => void
  idLivestreaming: string
  isInGlobalPage: boolean
  isInfinite: boolean
  time: number
  redirectTo: boolean
  originOfProducts: string
  showChat: boolean
  showLike: boolean
  showSidebarProducts: boolean
  showQuickView: boolean
  showProductsCarousel: boolean
  showViewers: boolean
  kuikpay: boolean
}

export declare interface Message {
  sessionId?: string
  data?: string
  sendDate?: string
  username?: string
  all?: Boolean
  isAdmin?: Boolean
  color?: string
  responseAdmin?: boolean
  type?: string
  second?: number
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
  sidebarProducts: boolean
  productsCarousel: boolean
  chat: boolean
  like: boolean
  infinite: boolean
  time: number
  quickView: boolean
  pdp: boolean
  kuikpay: boolean
  isInGlobalPage: boolean
}
export declare interface InfoSocket {
  socket: WebSocket | undefined
  chat: Message[]
  hearts: Heart[]
  sessionId: string
  ivsRealTime: IvsRealTime | undefined
  showCounter: boolean | undefined
  showGif: boolean | undefined
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
  pinnedMessage: Message | undefined
  transmitiontype: string | undefined
  productsInCart: Products[]
  setProductsInCart: React.Dispatch<React.SetStateAction<Products[]>>
  setQueueSocket: React.Dispatch<
    React.SetStateAction<Queue<number> | undefined>
  >
  showCarouselChatButton: boolean | undefined
}

export interface ProductImages {
  imageUrl: string
}

export interface ProductSellers {
  addToCartLink: string
  commertialOffer: { IsAvailable: boolean; ListPrice: number; Price: number }
}
export interface ProductItems {
  itemId: string
  images: ProductImages[]
  sellers: ProductSellers[]
  variations: string[]
}

export interface Field {
  id: number
  isActive: boolean
  name: string
  position: number
  type: string
}

export interface Values {
  id: string
  name: string
  position?: number
  selectValue?: string
  variationId?: number
  variationName?: string
}
export interface VariationSelector {
  field: Field
  values: Values[]
}
export interface Products {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  items?: ProductItems[]
  isAvailable: boolean
  variationSelector?: VariationSelector[]
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

export interface OptionsCurrency {
  symbol: string
  decimalSeparator: string
  thousandsSeparator: string
  numberOfDecimals: number
  positionSymbol: string
}

export interface CurrencyFormat {
  CurrencyDecimalDigits: number
  CurrencyDecimalSeparator: string
  CurrencyGroupSeparator: string
  CurrencyGroupSize: number
  StartsWithCurrencySymbol: string
}

export interface HightLightHistoryElement {
  productId: string
  joinSecond: number
  outSecond: number
}
