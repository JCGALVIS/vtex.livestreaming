/* eslint-disable no-unused-vars */
import { Dispatch, useContext, useEffect } from 'react'
import { Actions } from '../reducer'
import { apiCall } from '../../../../services/apiCall'
import { HightLightHistoryElement } from '../../../../typings/livestreaming'
import { config } from '../../../../enviroment/config'
import { ActionsContext } from '../../..'

export const useSetHighlightHistory = (dispatch: Dispatch<Actions>) => {
  const {
    setting: { environment, idLivestreaming, account }
  } = useContext(ActionsContext)

  useEffect(() => {
    if (!environment || !idLivestreaming || !account) return

    let URL = '__GET_HIGHTLIGHT_BY_ID_URL'
    const { GET_HIGHTLIGHT_BY_ID_URL } = config(environment || '')

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
  }, [idLivestreaming, account, environment])
}
