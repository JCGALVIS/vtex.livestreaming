import { useEffect } from 'react'
import { useLivestreamingContext } from '../context'
import { Product } from '../typings/livestreaming'

export const useShowHightlightsForFinishedEvents = (
  hanledSetProduct: (productId: string, storageProducts: Product[]) => void,
  setShowProduct: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  isFinalized: boolean,
  products?: Product[]
) => {
  const { currentHightLightProductId } = useLivestreamingContext()

  useEffect(() => {
    if (!isFinalized) return


    if (!products) return

    const product = products.find(
      (product: { id: string | undefined }) =>
        product.id === currentHightLightProductId
    )

    if (product) {
      hanledSetProduct(currentHightLightProductId, products)
      setShowProduct(!!currentHightLightProductId)
    } else {
      setShowProduct(false)
    }
  }, [currentHightLightProductId])
}
