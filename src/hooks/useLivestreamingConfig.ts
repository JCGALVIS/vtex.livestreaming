import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
declare interface Props {
  id: string
  account: string
}

export const useLivestreamingConfig = ({ id, account }: Props) => {
  const [wssStream, setWssStream] = useState<string | undefined>(undefined)
  const [streamUrl, setStreamUrl] = useState<string | undefined>(undefined)
  const { REACT_APP_GET_LIVESTREAMING_CONFIG_URL } = process.env

  useEffect(() => {
    if (!REACT_APP_GET_LIVESTREAMING_CONFIG_URL) return
    const url = `${REACT_APP_GET_LIVESTREAMING_CONFIG_URL}?id=${id}&account=${account}`

    const getLivestreaming = async () => {
      const data = await apiCall({
        url
      })

      setWssStream(data?.streamWSS)
      setStreamUrl(data?.streamURL)
    }

    getLivestreaming().catch(null)
  }, [id, account])

  return { wssStream, streamUrl }
}
