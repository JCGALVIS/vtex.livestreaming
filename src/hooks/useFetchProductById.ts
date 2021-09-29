import { getProductById } from './../api/getProductById'
import { useEffect, useState } from 'react'

type useFetchProductById = {
  productId: string | undefined
  account: string
}
export const useFetchProductById = ({
  productId,
  account
}: useFetchProductById) => {
  const [product, setProduct] = useState({
    data: [
      {
        id: '',
        name: '',
        price: 0,
        priceWithDiscount: 0,
        imageUrl: '',
        addToCartLink: '',
        isAvailable: false,
        variationSelector: []
      }
    ],
    loading: true
  })

  useEffect(() => {
    if (productId) {
      getProductById({ productId, account }).then((respon: any) => {
        console.log('respon: ', respon)
        if (respon) setProduct({ data: respon, loading: false })
      })
    }
  }, [productId])

  return product
}
