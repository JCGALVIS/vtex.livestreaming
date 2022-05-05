/* eslint-disable no-unused-vars */
import { Dispatch, useEffect } from 'react';
import { Actions } from './reducer';

export const useSetLivestreaming = (
  idLivestreaming: string,
  account: string,
  host: string,
  playBackStartTime: number,
  dispatch: Dispatch<Actions>,
) => {
  useEffect(() => {
    if (idLivestreaming && account) {
      dispatch({
        type: 'SET_LIVESTREAM_CONFIG',
        args: {
          idLivestreaming,
          account,
          host,
          playBackStartTime,
        },
      });
    }
  }, [idLivestreaming, account, host, playBackStartTime]);
};
