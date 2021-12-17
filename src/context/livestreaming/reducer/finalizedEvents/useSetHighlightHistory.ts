/* eslint-disable no-unused-vars */
import { Dispatch, useEffect } from 'react'
import { Actions } from '../reducer'
import { apiCall } from '../../../../services/apiCall'
import { HightLightHistoryElement } from '../../../../typings/livestreaming'

export const useSetHighlightHistory = (
  idLivestreaming: string,
  account: string,
  dispatch: Dispatch<Actions>
) => {
  useEffect(() => {
    let URL = '__GET_HIGHTLIGHT_BY_ID_URL'
    const { GET_HIGHTLIGHT_BY_ID_URL } = process.env

    if (GET_HIGHTLIGHT_BY_ID_URL && GET_HIGHTLIGHT_BY_ID_URL !== URL) {
      URL = GET_HIGHTLIGHT_BY_ID_URL
    }

    if (!URL) return

    const getHightlight = async () => {
      const highlight: { data: HightLightHistoryElement[] } = await apiCall({
        url: `${URL}/${account}/${idLivestreaming}`
      })
      if (highlight?.data?.length) {
        dispatch({
          type: 'SET_HIGHLIGHT_HISTORY',
          args: {
            highlightHistory: highlight?.data
          }
        })
      }
    }
    getHightlight().catch(null)
  }, [])
}
