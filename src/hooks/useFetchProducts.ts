import { useContext, useEffect, useState } from 'react'
import {
  ActionsContext,
  useLivestreamingContext,
  SettingContext
} from '../context'
import { optionsToGetProducts } from '../services'
import type { Products } from '../typings/livestreaming'
import { apiCall } from '../services'
import { config } from '../enviroment/config'

type useFetchProductsProps = {
  collectionId: string | undefined
  setCollection?: React.Dispatch<React.SetStateAction<string | undefined>>
}

export const useFetchProducts = ({
  collectionId,
  setCollection
}: useFetchProductsProps) => {
  const {
    setting: { account, environment, getProducts, originOfProducts }
  } = useContext(ActionsContext)

  const { host, idLivestreaming } = useLivestreamingContext()
  const { activePromo, updateLivestreaming } = useContext(SettingContext)

  const [products, setProducts] = useState<Products[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [timer, setTimer] = useState<any>()
  const [forceUpdate, setForceUpdate] = useState('')

  const productsList = async (collectionId: string, account?: string) => {
    const data = getProducts && (await getProducts(collectionId, account))
    return data
  }

  const getUrl = () => {
    let URL = '__GET_LIVESTREAMING_CONFIG_URL'
    const { GET_LIVESTREAMING_CONFIG_URL } = config(environment || '')
    if (GET_LIVESTREAMING_CONFIG_URL && GET_LIVESTREAMING_CONFIG_URL !== URL) {
      URL = GET_LIVESTREAMING_CONFIG_URL
    }
    return URL
  }

  const scheduledSidebarReload = () => {
    setForceUpdate(`${Date.now()}`)
    if (timer) {
      clearInterval(timer)
    }
    const newTimer = setInterval(() => {
      setForceUpdate(`${Date.now()}`)
    }, 420000) //7 min
    setTimeout(() => {
      clearTimeout(newTimer)
    }, 1260000) //7x3 min
    setTimer(newTimer)
  }

  useEffect(() => {
    if (activePromo) {
      const { isCoupon } = activePromo
      if (!isCoupon) {
        scheduledSidebarReload()
      }
    }
  }, [activePromo])

  useEffect(() => {
    const URL = getUrl()
    apiCall({
      url: `${URL}?id=${idLivestreaming}&account=${account}`
    }).then((data) => {
      if (data) {
        if (setCollection) setCollection(data?.collection?.id)
      }
    })
  }, [updateLivestreaming])

  useEffect(() => {
    if (collectionId) {
      if (originOfProducts === 'CACE' || originOfProducts === 'globalPage') {
        optionsToGetProducts({
          collectionId: collectionId,
          originOfProducts,
          account,
          host,
          environment
        }).then((response: any) => {
          if (response) {
            setLoading(true)
            setProducts(response)
          }
        })
      } else {
        productsList(collectionId, account).then((response: any) => {
          if (response) {
            setProducts(response)
          }
        })
      }
    }

    const timeout = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timeout)
  }, [collectionId, forceUpdate])

  return { products, loading }
}
