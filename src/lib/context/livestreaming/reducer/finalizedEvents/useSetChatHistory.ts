import { Dispatch, useContext, useEffect } from 'react';
import { Actions } from '../reducer';
import { apiCall } from '../../../../services/apiCall';
import { Message } from '../../../../../typings/livestreaming';
import { ActionsContext } from '../../..';
import { config } from '../../../../enviroment/config';

export const useSetChatHistory = (dispatch: Dispatch<Actions>) => {
  const {
    setting: { environment, idLivestreaming, account },
  } = useContext(ActionsContext);

  useEffect(() => {
    if (!environment || !idLivestreaming || !account) return;

    let URL = '__GET_CHAT_BY_ID_URL';
    const { GET_CHAT_BY_ID_URL } = config(environment || '');

    if (GET_CHAT_BY_ID_URL && GET_CHAT_BY_ID_URL !== URL) {
      URL = GET_CHAT_BY_ID_URL;
    }

    if (!URL) return;

    const getChat = async () => {
      const chat: { data: Message[] } = await apiCall({
        url: `${URL}/${account}/${idLivestreaming}`,
      });
      if (chat?.data?.length) {
        dispatch({
          type: 'SET_CHAT_HISTORY',
          args: {
            chatHistory: chat?.data,
          },
        });
      }
    };
    getChat().catch(null);
  }, [idLivestreaming, account, environment]);
};
