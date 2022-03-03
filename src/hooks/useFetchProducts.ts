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
}

export const useFetchProducts = ({ collectionId }: useFetchProductsProps) => {
  const {
    setting: { account, environment, getProducts, originOfProducts }
  } = useContext(ActionsContext)

  const { host, idLivestreaming } = useLivestreamingContext()
  const { activePromoMessage, updateLivestreaming } = useContext(SettingContext)

  const [products, setProducts] = useState<Products[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [collection, setCollection] = useState<string | undefined>(collectionId)

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

  useEffect(() => {
    setCollection(collectionId)
  }, [collectionId])

  useEffect(() => {
    const URL = getUrl()
    apiCall({
      url: `${URL}?id=${idLivestreaming}&account=${account}`
    }).then((data) => {
      if (data) {
        setCollection(data?.collection?.id)
      }
    })
  }, [updateLivestreaming])

  useEffect(() => {
    if (collection) {
      if (getProducts && !originOfProducts) {
        productsList(collection, account).then((response: any) => {
          if (response) {
            setProducts(response)
            setLoading(false)
          }
        })
      } else {
        optionsToGetProducts({
          collectionId: collection,
          originOfProducts,
          account,
          host,
          environment
        }).then((response: any) => {
          if (response) {
            setProducts(response)
            setLoading(false)
          }
        })
      }
    }
  }, [collection, activePromoMessage])

  return { products, loading }
}
