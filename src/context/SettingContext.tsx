/* eslint-disable no-unused-vars */
import React, { createContext, FC, useState } from 'react'

import { useWebSocket } from '../hooks'
import { InfoSocket, PromotionTrigger } from '../typings/livestreaming'

type AlertMessage = {
  type: 'error' | 'success' | 'info' | 'warning'
  value: string
}

type SettingCtx = {
  collectionId?: string
  infoSocket?: InfoSocket
  isModalLive: boolean | undefined
  alertMessage: AlertMessage | null
  setIsModalLive: (isModalLive: boolean) => void
  wssStream?: string
  showCarouselChat?: boolean
  showCarouselChatButton?: boolean
  setAlertMessage: (message: AlertMessage | null) => void
  setShowCarouselChat?: React.Dispatch<React.SetStateAction<boolean>>
  setShowCarouselChatButton?: React.Dispatch<React.SetStateAction<boolean>>
  setActivePromo?: React.Dispatch<
    React.SetStateAction<PromotionTrigger | undefined>
  >
  activePromo?: PromotionTrigger
  setUpdateLivestreaming?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  updateLivestreaming?: string
  setCollection?: React.Dispatch<React.SetStateAction<string | undefined>>
}

const settingDefault: SettingCtx = {
  isModalLive: false,
  showCarouselChat: false,
  alertMessage: null,
  setIsModalLive: () => {},
  setShowCarouselChatButton: () => {},
  setActivePromo: () => {},
  setCollection: () => {},
  setAlertMessage: () => null
}

export const SettingContext = createContext<SettingCtx>(settingDefault)

export const SettingProvider: FC<SettingCtx> = ({
  collectionId,
  children,
  isModalLive,
  setIsModalLive,
  wssStream
}) => {
  const infoSocket = useWebSocket({ wssStream })
  const [showCarouselChat, setShowCarouselChat] = useState(false)
  const [showCarouselChatButton, setShowCarouselChatButton] = useState(false)
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null)
  const [activePromo, setActivePromo] = useState<PromotionTrigger>()
  const [updateLivestreaming, setUpdateLivestreaming] = useState<string>()
  const [collection, setCollection] = useState(collectionId)

  const contex: SettingCtx = {
    collectionId: collection,
    infoSocket,
    isModalLive,
    alertMessage,
    setIsModalLive,
    showCarouselChat,
    setAlertMessage,
    setShowCarouselChat,
    showCarouselChatButton,
    setShowCarouselChatButton,
    activePromo,
    setActivePromo,
    updateLivestreaming,
    setUpdateLivestreaming,
    setCollection
  }
  return (
    <SettingContext.Provider value={contex}>{children}</SettingContext.Provider>
  )
}
