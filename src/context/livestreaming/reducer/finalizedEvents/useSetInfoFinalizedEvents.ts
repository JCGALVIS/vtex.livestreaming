import { Dispatch } from 'react'
import { Actions } from '../reducer'
import { useSetChatHistory } from './useSetChatHistory'
import { useSetHighlightHistory } from './useSetHighlightHistory'

export const useSetInfoFinalizedEvents = (dispatch: Dispatch<Actions>) => {
  useSetChatHistory(dispatch)
  useSetHighlightHistory(dispatch)
}
