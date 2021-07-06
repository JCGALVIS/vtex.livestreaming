import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
declare interface Props {
  id: string
  account: string
}

export const useLivestreamingConfig = ({ id, account }: Props) => {
  const [wssStream, setWssStream] = useState<string | undefined>(undefined)
  const [streamUrl, setStreamUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getLivestreaming = async () => {
      const data = await apiCall({
        url: `https://x5vzeovx68.execute-api.us-east-1.amazonaws.com/Prod/livestreamingconfig?id=${id}&account=${account}`
      })

      const { streamWSS, streamURL } = data

      setWssStream(streamWSS)
      setStreamUrl(streamURL)
    }

    getLivestreaming().catch(null)
  }, [id, account])

  return { wssStream, streamUrl }
}
