import { getProductById } from './../services'
import { useEffect, useState } from 'react'

type useFetchProductById = {
  productId: string | undefined
  originOfProducts: string | undefined
}
export const useFetchProductById = ({
  productId,
  originOfProducts
}: useFetchProductById) => {
  const [product, setProduct] = useState({
    data: {
      id: '',
      name: '',
      price: 0,
      priceWithDiscount: 0,
      imageUrl: '',
      addToCartLink: '',
      items: [],
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
      getProductById({ productId, originOfProducts }).then((respon: any) => {
        if (respon) setProduct({ data: respon, loading: false })
      })
    }
  }, [productId])

  return product
}
