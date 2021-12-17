import { Dispatch } from 'react'
import { Actions } from '../reducer'
import { useSetChatHistory } from './useSetChatHistory'
import { useSetHighlightHistory } from './useSetHighlightHistory'

export const useSetInfoFinalizedEvents = (
  idLivestreaming: string,
  account: string,
  dispatch: Dispatch<Actions>
) => {
  useSetChatHistory(idLivestreaming, account, dispatch)
  useSetHighlightHistory(idLivestreaming, account, dispatch)
}
