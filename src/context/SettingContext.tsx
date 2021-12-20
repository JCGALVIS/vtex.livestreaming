/* eslint-disable no-unused-vars */
import React, { createContext, FC, useState } from 'react'

import { useWebSocket } from '../hooks'
import { InfoSocket } from '../typings/livestreaming'

type SettingCtx = {
  collectionId?: string
  infoSocket?: InfoSocket
  isModalLive: boolean | undefined
  setIsModalLive: (isModalLive: boolean) => void
  wssStream?: string
  showCarouselChat?: boolean
  setShowCarouselChat?: React.Dispatch<React.SetStateAction<boolean>>
}

const settingDefault: SettingCtx = {
  isModalLive: false,
  setIsModalLive: () => {},
  showCarouselChat: false
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

  const contex: SettingCtx = {
    collectionId,
    infoSocket,
    isModalLive,
    setIsModalLive,
    showCarouselChat,
    setShowCarouselChat
  }
  return (
    <SettingContext.Provider value={contex}>{children}</SettingContext.Provider>
  )
}
