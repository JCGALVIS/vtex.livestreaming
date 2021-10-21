import { getProductById } from './../services'
import { useEffect, useState } from 'react'
import type { Products } from '../typings/livestreaming'

type useFetchProductById = {
  productId: string | undefined
  originOfProducts: string | undefined
}
export const useFetchProductById = ({
  productId,
  originOfProducts
}: useFetchProductById) => {
  const [product, setProduct] = useState<Products>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (productId) {
      getProductById({ productId, originOfProducts }).then((respon: any) => {
        if (respon) {
          setProduct(respon)
          setLoading(false)
        }
      })
    }
  }, [productId])

  return { product, loading }
}
