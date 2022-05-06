/* eslint-disable no-unused-vars */
import React, { Dispatch, useCallback } from 'react';
import { LivestreamingCtx, LivestreamingContext } from './livestreamingContext';
import { Actions } from './';
import { LivestreamDispatchContext } from './ClientUseLivestreamDispatchContext';
import { Message } from '../../../typings/livestreaming';
import { useSetInfoFinalizedEvents } from '../../context';
interface Props {
  children: React.ReactNode;
  value: LivestreamingCtx;
  dispatch: Dispatch<Actions>;
}

export const LivestreamingProvider = ({ children, value, dispatch }: Props) => {
  const handleSetChat = useCallback((chat: Message[]) => {
    dispatch({
      type: 'SET_CHAT',
      args: {
        chat,
      },
    });
  }, []);

  const handleSetHightLight = useCallback((productId: string) => {
    dispatch({
      type: 'SET_HIGHTLIGHT',
      args: {
        productId,
      },
    });
  }, []);

  useSetInfoFinalizedEvents(dispatch);

  return (
    <LivestreamingContext.Provider
      value={{ ...value, handleSetChat, handleSetHightLight }}
    >
      <LivestreamDispatchContext.Provider value={dispatch}>
        {children}
      </LivestreamDispatchContext.Provider>
    </LivestreamingContext.Provider>
  );
};
