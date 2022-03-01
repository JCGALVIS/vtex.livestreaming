/* eslint-disable no-unused-vars */
import React, { createContext, useState, FC, useEffect } from 'react'
import type { LivestreamingProps } from '../typings/livestreaming'

type ActionCtx = {
  setting: LivestreamingProps
  setSetting: (livestreamingProps: LivestreamingProps) => void
}

const actionsDefault: ActionCtx = {
  setting: {
    addToCart: () => {},
    account: '',
    environment: '',
    getProductId: () => {},
    getProducts: () => {},
    idLivestreaming: '',
    isInGlobalPage: false,
    isInfinite: true,
    kuikpay: false,
    originOfProducts: '',
    redirectTo: true,
    showChat: true,
    showLike: true,
    showQuickView: true,
    showProductsCarousel: false,
    showSidebarProducts: false,
    showViewers: true,
    time: 10
  },
  setSetting: () => {}
}

export const ActionsContext = createContext<ActionCtx>(actionsDefault)

export type ActionsProviderProps = {
  props: LivestreamingProps
}

export const ActionsProvider: FC<ActionsProviderProps> = ({
  children,
  props
}) => {
  const {
    addToCart,
    account,
    environment,
    getProductId,
    getProducts,
    idLivestreaming,
    isInGlobalPage,
    isInfinite,
    kuikpay,
    originOfProducts,
    redirectTo,
    showChat,
    showLike,
    showQuickView,
    showProductsCarousel,
    showSidebarProducts,
    showViewers,
    time,
    isLoading
  } = props

  const getSettings = () => {
    return {
      addToCart,
      account,
      environment,
      getProductId,
      getProducts,
      idLivestreaming,
      isInGlobalPage:
        isInGlobalPage === undefined ? false : isInGlobalPage === true,
      isInfinite: isInfinite === undefined ? true : isInfinite === true,
      kuikpay: kuikpay === undefined ? false : kuikpay === true,
      originOfProducts,
      redirectTo: redirectTo === undefined ? true : redirectTo === true,
      showChat: showChat === undefined ? true : showChat === true,
      showLike: showLike === undefined ? true : showLike === true,
      showQuickView:
        showQuickView === undefined ? true : showQuickView === true,
      showProductsCarousel:
        showProductsCarousel === undefined
          ? false
          : showProductsCarousel === true,
      showSidebarProducts:
        showSidebarProducts === undefined
          ? false
          : showSidebarProducts === true,
      showViewers: showViewers === undefined ? true : showViewers === true,
      time
    }
  }

  const [setting, setSetting] = useState<LivestreamingProps>(getSettings())

  useEffect(() => {
    if (isLoading === undefined || isLoading) return
    setSetting(getSettings())
  }, [isLoading])

  const context: ActionCtx = {
    setting,
    setSetting
  }

  return (
    <ActionsContext.Provider value={context}>
      {children}
    </ActionsContext.Provider>
  )
}
