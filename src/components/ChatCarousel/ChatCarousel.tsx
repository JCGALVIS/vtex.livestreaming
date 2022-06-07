/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

import { useFetchProducts } from '../../hooks/useFetchProducts'
import { SettingContext } from '../../context'

import styles from '../ProductSlider/productSlider.css'
import { ChatCarouselProductItem } from '../ProductSlider/ChatCarouselProductItem'
import { Spinner } from '../commonComponents'

type ChatCarouselProps = {
  variationSelectorState: [string, React.Dispatch<React.SetStateAction<string>>]
  transmitionType: string | undefined
  fullScreen: boolean
  isTransmiting: boolean | undefined
  handleFullScreen: () => void
}

export const ChatCarousel = ({
  variationSelectorState,
  fullScreen,
  handleFullScreen,
  isTransmiting = false
}: ChatCarouselProps) => {
  const { collectionId, setCollection } = useContext(SettingContext)

  const { products, loading } = useFetchProducts({
    collectionId,
    setCollection
  })

  return loading ? (
    <div className={styles.chatCarouselContainer}>
      <Spinner />
    </div>
  ) : products ? (
    <div
      className={styles.chatCarouselContainer}
      style={{ width: isTransmiting ? '85%' : '100%' }}
    >
      {products &&
        products.length > 0 &&
        products.map((product: any) => (
          <div key={product.id} className={styles.horizontalProductList}>
            <ChatCarouselProductItem
              product={product}
              variationSelectorState={variationSelectorState}
              sectionIdClickedOn='live_shopping_carousel'
              fullScreen={fullScreen}
              handleFullScreen={handleFullScreen}
            />
          </div>
        ))}
    </div>
  ) : null
}
