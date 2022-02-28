/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react'
import type { Products } from '../typings/livestreaming'
import { ActionsContext } from '../context'
import { getProductByIdCace } from '../services'

type useFetchProductById = {
  productId: string | undefined
}
export const useFetchProductById = ({ productId }: useFetchProductById) => {
  const {
    setting: { account, getProductId, originOfProducts }
  } = useContext(ActionsContext)
  const [product, setProduct] = useState<Products>()
  const [loading, setLoading] = useState<boolean>(false)

  const getProductById = async (productId: string) => {
    const data = getProductId && (await getProductId(productId, account))
    return data
  }

  useEffect(() => {
    setLoading(false)
    if (productId) {
      if (getProductId && originOfProducts !== 'CACE') {
        getProductById(productId).then((respon: any) => {
          if (respon) {
            setProduct(respon)
            setLoading(true)
          }
        })
      } else {
        getProductByIdCace({ productId }).then((respon: any) => {
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
