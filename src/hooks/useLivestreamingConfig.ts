/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { apiCall } from '../services'
import type { Message } from '../typings/livestreaming'
declare interface Props {
  id: string
  account: string
}

const useLivestreamingConfig = ({ id, account }: Props) => {
  const [wssStream, setWssStream] = useState<string>()
  const [streamUrl, setStreamUrl] = useState<string>()
  const [collectionId, setCollectionId] = useState<string>()
  const [utm, setUtm] = useState<string>()
  const [emailIsRequired, setEmailIsRequired] = useState<boolean>()
  const [pinnedMessage, setPinnedMessage] = useState<Message>()
  const [transmitionType, setTransmitionType] = useState<string>()
  const [isModalLive, setIsModalLive] = useState<boolean>()
  const [status, setStatus] = useState('')

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
      setPinnedMessage(data?.pinnedMessage)
      setTransmitionType(data?.webClient?.transmitionType)
      setIsModalLive(data?.webClient.modalLive)
      setStatus(data.status)
    }

    getLivestreaming().catch(null)
  }, [id, account])

  return {
    wssStream,
    streamUrl,
    collectionId,
    utm,
    emailIsRequired,
    pinnedMessage,
    transmitionType,
    isModalLive,
    setIsModalLive,
    status
  }
}

export default useLivestreamingConfig
