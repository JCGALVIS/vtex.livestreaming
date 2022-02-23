import { useContext, useEffect, useState } from 'react'
import { ActionsContext } from '../context'
import { getProductsCace } from '../services'
import type { Products } from '../typings/livestreaming'

type useFetchProductsProps = {
  collectionId: string | undefined
}

export const useFetchProducts = ({ collectionId }: useFetchProductsProps) => {
  const {
    setting: { account, getProducts }
  } = useContext(ActionsContext)

  const [products, setProducts] = useState<Products[]>()
  const [loading, setLoading] = useState<boolean>(true)

  const productsList = async (collectionId: string, account?: string) => {
    const data = getProducts && (await getProducts(collectionId, account))
    return data
  }

  useEffect(() => {
    if (collectionId) {
      if (getProducts) {
        productsList(collectionId, account).then((response: any) => {
          if (response) {
            console.log('response: ', response)
            setProducts(response)
            setLoading(false)
          }
        })
      } else {
        getProductsCace({ collectionId }).then((response: any) => {
          if (response) {
            setProducts(response)
            setLoading(false)
          }
        })
      }
    }
  }, [collectionId])

  return { products, loading }
}
