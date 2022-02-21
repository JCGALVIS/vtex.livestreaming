/* eslint-disable no-unused-vars */
import React, { useContext, Dispatch } from 'react'

import type { Actions } from './'

type AppContextInterface = Dispatch<Actions> | null
export const LivestreamDispatchContext =
  React.createContext<AppContextInterface>(null)

export const useLivestreamingDispatch = () => {
  return useContext(LivestreamDispatchContext)
}
