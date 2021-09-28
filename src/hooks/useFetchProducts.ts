import { useEffect, useState } from 'react'
import { getProducts } from '../api'

type useFetchProductsProps = {
  collectionId: string | undefined
  originOfProducts: string
  account: string
}

export const useFetchProducts = ({
  collectionId,
  originOfProducts,
  account
}: useFetchProductsProps) => {
  const [products, setProducts] = useState({
    data: [
      {
        id: '',
        name: '',
        price: 0,
        priceWithDiscount: 0,
        imageUrl: '',
        addToCartLink: '',
        isAvailable: false
      }
    ],
    loading: true
  })

  useEffect(() => {
    if (collectionId) {
      getProducts({ collectionId, originOfProducts, account }).then(
        (respon: any) => {
          if (respon) setProducts({ data: respon, loading: false })
        }
      )
    }
  }, [collectionId])

  return products
}
