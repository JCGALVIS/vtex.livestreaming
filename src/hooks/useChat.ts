import { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
// import { Message } from '../typings/livestreaming'
// import { client } from '../services/cassandra'
import {
  getData,
  getEnvironmentTable,
  dynamoTablesName
} from '../server/dynamodb/'

declare interface Props {
  idLivestreaming: string
  account: string
}

export const useChat = ({ idLivestreaming, account }: Props) => {
  const [chat, setChat] = useState<any>([])

  useEffect(() => {
    const getChat = async () => {
      const { LIVESTREAMINGS_TABLE } = dynamoTablesName

      const data = await getData({
        TableName: getEnvironmentTable(false, LIVESTREAMINGS_TABLE),
        Key: { account, id: idLivestreaming },
        ProjectionExpression: 'info'
      })
      setChat(data?.info.chat)
    }

    getChat().catch(null)
  }, [])

  return { chatHistory: chat, setChat }
}
