import { useEffect, useState } from 'react'
import {
  getData,
  dynamoTablesName,
  getEnvironmentTable
} from '../server/dynamodb'

declare interface Props {
  id: string
  account: string
}

export const useLivestreamingConfig = ({ id, account }: Props) => {
  const [wssStream, setWssStream] = useState<string | undefined>(undefined)
  const [streamUrl, setStreamUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getLivestreaming = async () => {
      const { LIVESTREAMINGS_TABLE } = dynamoTablesName

      const data = await getData({
        TableName: getEnvironmentTable(LIVESTREAMINGS_TABLE),
        Key: { account, id },
        ProjectionExpression: 'config'
      })

      setWssStream(data?.config.webClient.streamWSS)
      setStreamUrl(data?.config.webClient.streamURL)
    }

    getLivestreaming().catch(null)
  }, [id, account])

  return { wssStream, streamUrl }
}
