import { useContext, useEffect, useState } from 'react'
// import { getProducts } from '../services'
import { ActionsContext } from '../context'

type useFetchProductsProps = {
  collectionId: string | undefined
}

export const useFetchProducts = ({ collectionId }: useFetchProductsProps) => {
  const {
    setting: { getProducts }
  } = useContext(ActionsContext)

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

  const productsList = async (collectionId: string) => {
    const data = getProducts && (await getProducts(collectionId))
    return data
  }

  useEffect(() => {
    if (collectionId) {
      productsList(collectionId).then((response: any) => {
        response && setProducts({ data: response, loading: false })
      })
    }
  }, [collectionId])

  return products
}
