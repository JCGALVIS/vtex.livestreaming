import { Dispatch, useEffect } from 'react'
import { Actions } from './reducer'

export const useSetLivestreaming = (
  idLivestreaming: string,
  account: string,
  host: string,
  playBackStartTime: number,
  dispatch: Dispatch<Actions>
) => {
  useEffect(() => {
    if (idLivestreaming && account) {
      dispatch({
        type: 'SET_LIVESTREAM_CONFIG',
        args: {
          idLivestreaming,
          account,
          host,
          playBackStartTime
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idLivestreaming, account, host, playBackStartTime])
}
