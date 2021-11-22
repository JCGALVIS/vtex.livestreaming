import React, { Dispatch, useCallback } from 'react'
import { LivestreamingCtx, LivestreamingContext } from './livestreamingContext'
import { Actions } from '../reducer'
import { LivestreamDispatchContext } from './ClientUseLivestreamDispatchContext'
import { Message } from '../../typings/livestreaming'

interface Props {
  children: React.ReactNode
  value: LivestreamingCtx
  dispatch: Dispatch<Actions>
}

export const LivestreamingProvider = ({ children, value, dispatch }: Props) => {
  const handleSetChat = useCallback((chat: Message[]) => {
    dispatch({
      type: 'SET_CHAT',
      args: {
        chat
      }
    })
  }, [])

  return (
    <LivestreamingContext.Provider value={{ ...value, handleSetChat }}>
      <LivestreamDispatchContext.Provider value={dispatch}>
        {children}
      </LivestreamDispatchContext.Provider>
    </LivestreamingContext.Provider>
  )
}
