/* eslint-disable no-unused-vars */
import React, { createContext, FC } from 'react'

type SettingCtx = {
  isModalLive: boolean | undefined
  selectedProduct: {
    productId: string
    imageUrl: string
  }[]
  setIsModalLive: (isModalLive: boolean) => void
  setSelectedProduct: (
    selectedProduct: {
      productId: string
      imageUrl: string
    }[]
  ) => void
}

const settingDefault: SettingCtx = {
  isModalLive: false,
  selectedProduct: [{ productId: '', imageUrl: '' }],
  setIsModalLive: () => {},
  setSelectedProduct: () => {}
}

export const SettingContext = createContext<SettingCtx>(settingDefault)

export const SettingProvider: FC<SettingCtx> = ({
  children,
  isModalLive,
  selectedProduct,
  setIsModalLive,
  setSelectedProduct
}) => {
  const contex: SettingCtx = {
    isModalLive,
    selectedProduct,
    setIsModalLive,
    setSelectedProduct
  }
  return (
    <SettingContext.Provider value={contex}>{children}</SettingContext.Provider>
  )
}
