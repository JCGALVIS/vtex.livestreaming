/* eslint-disable no-unused-vars */
import React, { createContext, useState, FC } from 'react'
import type { LivestreamingProps } from '../typings/livestreaming'

type ActionCtx = {
  setting: LivestreamingProps
  setSetting: (livestreamingProps: LivestreamingProps) => void
}

const actionsDefault: ActionCtx = {
  setting: {
    account: '',
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

type ActionsProviderProps = {
  props: LivestreamingProps
}

export const ActionsProvider: FC<ActionsProviderProps> = ({
  children,
  props
}) => {
  const {
    account,
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
    time
  } = props

  const [setting, setSetting] = useState<LivestreamingProps>({
    account,
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
    showQuickView: showQuickView === undefined ? true : showQuickView === true,
    showProductsCarousel:
      showProductsCarousel === undefined
        ? false
        : showProductsCarousel === true,
    showSidebarProducts:
      showSidebarProducts === undefined ? false : showSidebarProducts === true,
    showViewers: showViewers === undefined ? true : showViewers === true,
    time
  })

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
