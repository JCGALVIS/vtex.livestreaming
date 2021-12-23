import { useEffect } from 'react'
import { useLivestreamingContext } from '../context'

export const useShowHightlightsForFinishedEvents = (
  hanledSetProduct: (productId: string, storageProducts: string) => void,
  setShowProduct: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  isFinalized: boolean
) => {
  const { currentHightLightProductId } = useLivestreamingContext()

  useEffect(() => {
    if (!isFinalized) return

    const storageProducts = localStorage.getItem('products')
    if (!storageProducts) return

    const products = JSON.parse(storageProducts)
    const product = products.find(
      (product: { id: string | undefined }) =>
        product.id === currentHightLightProductId
    )

    if (product) {
      hanledSetProduct(currentHightLightProductId, storageProducts)
      setShowProduct(!!currentHightLightProductId)
    } else {
      setShowProduct(false)
    }
  }, [currentHightLightProductId])
}
