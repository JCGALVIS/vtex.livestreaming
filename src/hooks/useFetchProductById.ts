import { getProductById } from './../api/getProductById'
import { useEffect, useState } from 'react'

type useFetchProductById = {
  productId: string | undefined
}
export const useFetchProductById = ({ productId }: useFetchProductById) => {
  const [product, setProduct] = useState({
    data: {
      id: '',
      name: '',
      price: 0,
      priceWithDiscount: 0,
      imageUrl: '',
      addToCartLink: '',
      isAvailable: false,
      variationSelector: [
        {
          field: { id: 0, isActive: true, name: '', position: 0, type: '' },
          values: [{ id: '', name: '', position: 0 }]
        }
      ]
    },
    loading: true
  })

  useEffect(() => {
    if (productId) {
      getProductById({ productId }).then((respon: any) => {
        if (respon) setProduct({ data: respon, loading: false })
      })
    }
  }, [productId])

  return product
}
