import { useEffect, useState } from 'react'

declare interface Props {
  id: string
  account: string
}

export const useLivestreamingConfig = ({ id, account }: Props) => {
  const [wssStream, setWssStream] = useState<string | undefined>(undefined)
  const [streamUrl, setStreamUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getLivestreaming = async () => {
      /* const data = await apiCall({
        url: `https://x5vzeovx68.execute-api.us-east-1.amazonaws.com/Prod/chat?id=${idLivestreaming}&account=${account}`,
        method: 'GET'
      }) */
      const data = ''
      // setWssStream(data?.config.webClient.streamWSS)
      // setStreamUrl(data?.config.webClient.streamURL)
      setWssStream(data)
      setStreamUrl(data)
    }

    getLivestreaming().catch(null)
  }, [id, account])

  return { wssStream, streamUrl }
}
