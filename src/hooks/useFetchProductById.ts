/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import type { Product } from '../typings/livestreaming'
import { ActionsContext, useLivestreamingContext } from '../context'
import { optionsToGetProductById } from '../services'

type useFetchProductById = {
  productId: string | undefined
}
export const useFetchProductById = ({ productId }: useFetchProductById) => {
  const {
    setting: { account, environment, getProductId, originOfProducts }
  } = useContext(ActionsContext)

  const { host } = useLivestreamingContext()
  const [product, setProduct] = useState<Product>()
  const [loading, setLoading] = useState<boolean>(false)

  const getProductById = async (productId: string) => {
    const data = getProductId && (await getProductId(productId, account))
    return data
  }

  useEffect(() => {
    setLoading(false)
    if (productId) {
      if (originOfProducts === 'CACE' || originOfProducts === 'globalPage') {
        optionsToGetProductById({
          productId,
          originOfProducts,
          account,
          host,
          environment
        }).then((respon: any) => {
          if (respon) {
            setProduct(respon)
            setLoading(true)
          }
        })
      } else {
        getProductById(productId).then((respon: any) => {
          if (respon) {
            setProduct(respon)
            setLoading(true)
          }
        })
      }
    }
  }, [productId])

  return { product, loading }
}
