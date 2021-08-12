import { useEffect, useState } from 'react'

import { getProducts } from './../utils/getProducts'

type useFetchProductsProps = {
  collectionId: string | undefined
}

export const useFetchProducts = ({ collectionId }: useFetchProductsProps) => {
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
      getProducts({ collectionId }).then((respon) => {
        console.log('products: ', respon)
        setProducts({ data: respon, loading: false })
      })
    }
  }, [collectionId])

  return products
}
