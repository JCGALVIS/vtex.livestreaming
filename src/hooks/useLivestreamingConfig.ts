import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
declare interface Props {
  id: string
  account: string
}

export const useLivestreamingConfig = ({ id, account }: Props) => {
  const [wssStream, setWssStream] = useState<string | undefined>(undefined)
  const [streamUrl, setStreamUrl] = useState<string | undefined>(undefined)
  const [collectionId, setCollectionId] = useState<string | undefined>(
    undefined
  )
  const [utm, setUtm] = useState<string | undefined>(undefined)
  const [emailIsRequired, setEmailIsRequired] = useState<boolean | undefined>(
    undefined
  )

  useEffect(() => {
    let URL = '__GET_LIVESTREAMING_CONFIG_URL'
    const { GET_LIVESTREAMING_CONFIG_URL } = process.env

    if (GET_LIVESTREAMING_CONFIG_URL && GET_LIVESTREAMING_CONFIG_URL !== URL) {
      URL = GET_LIVESTREAMING_CONFIG_URL
    }

    if (!GET_LIVESTREAMING_CONFIG_URL) return

    const getLivestreaming = async () => {
      const data = await apiCall({
        url: `${URL}?id=${id}&account=${account}`
      })

      setWssStream(data?.webClient?.streamWSS)
      setStreamUrl(data?.webClient?.streamURL)
      setEmailIsRequired(data?.webClient?.emailIsRequired)
      setCollectionId(data?.collection?.id)
      setUtm(data?.utm)
    }

    getLivestreaming().catch(null)
  }, [id, account])

  return { wssStream, streamUrl, collectionId, utm, emailIsRequired }
}
