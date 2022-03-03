import { useContext, useEffect, useState } from 'react'
import { ActionsContext, useLivestreamingContext } from '../context'
import { optionsToGetProducts } from '../services'
import type { Products } from '../typings/livestreaming'

type useFetchProductsProps = {
  collectionId: string | undefined
}

export const useFetchProducts = ({ collectionId }: useFetchProductsProps) => {
  const {
    setting: { account, environment, getProducts, originOfProducts }
  } = useContext(ActionsContext)

  const { host } = useLivestreamingContext()

  const [products, setProducts] = useState<Products[]>()
  const [loading, setLoading] = useState<boolean>(true)

  const productsList = async (collectionId: string, account?: string) => {
    const data = getProducts && (await getProducts(collectionId, account))
    return data
  }

  useEffect(() => {
    if (collectionId) {
      if (getProducts && !originOfProducts) {
        productsList(collectionId, account).then((response: any) => {
          if (response) {
            setProducts(response)
          }
        })
      } else {
        optionsToGetProducts({ collectionId, originOfProducts, account, host, environment }).then((response: any) => {
          if (response) {
            setProducts(response)
          }
        })
      }
    }

    const timeout = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timeout)
  }, [collectionId])

  return { products, loading }
}
