/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import { ActionsContext } from '../context'
import { apiCall } from '../services'
import { config } from '../enviroment/config'
import type { Message, Settings } from '../typings/livestreaming'
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
  const [showGifButton, setShowGifButton] = useState<boolean>()
  const [showCarouselChatButton, setShowCarouselChatButton] =
    useState<boolean>()
  const [host, setHost] = useState<string>('')
  const [playBackStartTime, setPlayBackStartTime] = useState<number>(0)
  const [settings, setSettings] = useState<Settings>()
  const [isLoading, setIsLoading] = useState(true)

  const {
    setting: { environment }
  } = useContext(ActionsContext)

  console.log('environment: ', environment)

  useEffect(() => {
    let URL = '__GET_LIVESTREAMING_CONFIG_URL'
    const { GET_LIVESTREAMING_CONFIG_URL } = config(environment || '')

    console.log('GET_LIVESTREAMING_CONFIG_URL: ', GET_LIVESTREAMING_CONFIG_URL)

    if (GET_LIVESTREAMING_CONFIG_URL && GET_LIVESTREAMING_CONFIG_URL !== URL) {
      URL = GET_LIVESTREAMING_CONFIG_URL
    }

    if (!GET_LIVESTREAMING_CONFIG_URL) return

    const getLivestreaming = async () => {
      await apiCall({
        url: `${URL}?id=${id}&account=${account}`
      }).then((data) => {
        if (data) {
          setWssStream(data?.webClient?.streamWSS)
          setStreamUrl(data?.webClient?.streamURL)
          setEmailIsRequired(data?.webClient?.emailIsRequired)
          setCollectionId(data?.collection?.id)
          setUtm(data?.utm)
          setPinnedMessage(data?.pinnedMessage)
          setTransmitionType(data?.webClient?.transmitionType)
          setIsModalLive(data?.webClient.modalLive)
          setStatus(data?.status)
          setShowGifButton(data?.webClient?.showGif)
          setShowCarouselChatButton(data?.webClient?.showCarouselChat)
          setHost(data?.host)
          setSettings({
            showChat: data?.webClient?.showChat,
            showLike: data?.webClient?.showLike,
            showProductsCarousel: data?.webClient?.showProductsCarousel,
            showSidebarProducts: data?.webClient?.showProductsSidebar,
            isInfinite: data?.webClient?.infiniteScroll,
            redirectTo: data?.webClient?.redirectToPdp,
            showViewers: data?.webClient?.showCounter,
            time: data?.webClient?.scrollTime
          })
          if (data?.playBackStartTime && !isNaN(data?.playBackStartTime)) {
            setPlayBackStartTime(data?.playBackStartTime)
          } else {
            setPlayBackStartTime(0)
          }
          setIsLoading(false)
        }
      })
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
    status,
    showGifButton,
    showCarouselChatButton,
    host,
    playBackStartTime,
    settings,
    isLoading
  }
}

export default useLivestreamingConfig
