/* eslint-disable no-unused-vars */
import React, { createContext, FC, useState } from 'react'

import { useWebSocket } from '../hooks'
import { InfoSocket } from '../typings/livestreaming'

type SettingCtx = {
  collectionId?: string
  infoSocket?: InfoSocket
  isModalLive: boolean | undefined
  messageAlert?: string
  setIsModalLive: (isModalLive: boolean) => void
  wssStream?: string
  showCarouselChat?: boolean
  showCarouselChatButton?: boolean
  setMessageAlert?: React.Dispatch<React.SetStateAction<string>>
  setShowCarouselChat?: React.Dispatch<React.SetStateAction<boolean>>
  setShowCarouselChatButton?: React.Dispatch<React.SetStateAction<boolean>>
}

const settingDefault: SettingCtx = {
  isModalLive: false,
  setIsModalLive: () => {},
  showCarouselChat: false,
  setShowCarouselChatButton: () => {}
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
  const [messageAlert, setMessageAlert] = useState('')

  const contex: SettingCtx = {
    collectionId,
    infoSocket,
    isModalLive,
    messageAlert,
    setIsModalLive,
    showCarouselChat,
    setMessageAlert,
    setShowCarouselChat,
    showCarouselChatButton,
    setShowCarouselChatButton
  }
  return (
    <SettingContext.Provider value={contex}>{children}</SettingContext.Provider>
  )
}
