/* eslint-disable no-unused-vars */
import React, { createContext, useState, FC } from 'react'
import type { LivestreamingProps } from '../typings/livestreaming'

type ActionCtx = {
  setting: LivestreamingProps | null
  setSetting: (livestreamingProps: LivestreamingProps) => void
}

const actionsDefault: ActionCtx = {
  setting: null,
  setSetting: () => {}
}

const ActionsContext = createContext<ActionCtx>(actionsDefault)

type ActionsProviderProps = {
  props: LivestreamingProps
}

export const ActionsProvider: FC<ActionsProviderProps> = ({
  children,
  props
}) => {
  const {
    account,
    idLivestreaming,
    inactiveSidebarProducts,
    inactiveProductsCarousel,
    inactivateChat,
    inactivateLike,
    inactivateViewers,
    isInfinite,
    time,
    pdp,
    originOfProducts,
    kuikpay
  } = props

  const [setting, setSetting] = useState<LivestreamingProps | null>({
    account,
    idLivestreaming,
    inactiveSidebarProducts,
    inactiveProductsCarousel,
    inactivateChat,
    inactivateLike,
    inactivateViewers,
    isInfinite,
    time,
    pdp,
    originOfProducts,
    kuikpay
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
