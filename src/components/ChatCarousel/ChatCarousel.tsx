/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

import { useFetchProducts } from '../../hooks/useFetchProducts'
import { ActionsContext, SettingContext } from '../../context'

import styles from '../ProductSlider/productSlider.css'
import { ChatCarouselProductItem } from '../ProductSlider/ChatCarouselProductItem'

type ChatCarouselProps = {
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
}

export const ChatCarousel = ({ setShowVariation }: ChatCarouselProps) => {
  // const [selectedProductIndex, setSelectedProductIndex] = useState(0)

  const { collectionId } = useContext(SettingContext)
  const {
    setting: { originOfProducts }
  } = useContext(ActionsContext)

  const { data: products, loading } = useFetchProducts({
    collectionId,
    originOfProducts
  })

  return !loading ? (
    <div className={styles.chatCarouselContainer}>
      {products.length > 0 &&
        products.map((product: any) => (
          <div key={product.id} className={styles.horizontalProductList}>
            <ChatCarouselProductItem
              {...product}
              originOfProducts={originOfProducts}
              setShowVariation={setShowVariation}
              sectionIdClickedOn='live_shopping_carousel'
            />
          </div>
        ))}
    </div>
  ) : null
}
