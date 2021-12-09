import { useEffect, useState } from 'react'
import { getProducts } from '../services'
import { useLivestreamingContext } from '../context'

type useFetchProductsProps = {
  collectionId: string | undefined
  originOfProducts: string | undefined
}

export const useFetchProducts = ({
  collectionId,
  originOfProducts
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
        isAvailable: false,
        variationSelector: [],
        pdpLink: '',
        skuId: ''
      }
    ],
    loading: true
  })

  const { account } = useLivestreamingContext()

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
