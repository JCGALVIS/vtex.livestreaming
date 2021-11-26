/* eslint-disable no-unused-vars */
import React, { createContext, FC } from 'react'

type SettingCtx = {
  isModalLive: boolean | undefined
  setIsModalLive: (isModalLive: boolean) => void
}

const settingDefault: SettingCtx = {
  isModalLive: false,
  setIsModalLive: () => {}
}

export const SettingContext = createContext<SettingCtx>(settingDefault)

export const SettingProvider: FC<SettingCtx> = ({
  children,
  isModalLive,
  setIsModalLive
}) => {
  const contex: SettingCtx = {
    isModalLive,
    setIsModalLive
  }
  return (
    <SettingContext.Provider value={contex}>{children}</SettingContext.Provider>
  )
}
