import { useEffect } from 'react'
import { useLivestreamingContext } from '../context'

export const useShowHightlightsForFinishedEvents = (
  hanledSetProduct: (productId: string) => void,
  setShowProduct: React.Dispatch<React.SetStateAction<boolean | undefined>>
) => {
  const { currentHightLightProductId } = useLivestreamingContext()
  useEffect(() => {
    hanledSetProduct(currentHightLightProductId)
    setShowProduct(!!currentHightLightProductId)
  }, [currentHightLightProductId])
}
