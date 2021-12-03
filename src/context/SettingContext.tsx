/* eslint-disable no-unused-vars */
import React, { createContext, FC } from 'react'

import { useWebSocket } from '../hooks'
import { InfoSocket } from '../typings/livestreaming'

type SettingCtx = {
  collectionId?: string
  infoSocket?: InfoSocket
  isModalLive: boolean | undefined
  setIsModalLive: (isModalLive: boolean) => void
  wssStream?: string
}

const settingDefault: SettingCtx = {
  isModalLive: false,
  setIsModalLive: () => {}
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

  const contex: SettingCtx = {
    collectionId,
    infoSocket,
    isModalLive,
    setIsModalLive
  }
  return (
    <SettingContext.Provider value={contex}>{children}</SettingContext.Provider>
  )
}
