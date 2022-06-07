import React from 'react'
import { useSettings } from '../../context'
import { useAddToCart } from '../../hooks'
import type { Product } from '../../typings/livestreaming'
import { currencyFormat } from '../../utils'
import styles from './productSlider.css'

type ChatCarouselProductItemProps = {
  product: Product
  variationSelectorState?: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ]
  sectionIdClickedOn?: string
  fullScreen: boolean
  handleFullScreen: () => void
}

export const ChatCarouselProductItem = (
  props: ChatCarouselProductItemProps
) => {
  const { infoSocket } = useSettings()
  const { product, variationSelectorState, fullScreen, handleFullScreen } =
    props
  const { priceWithDiscount, imageUrl } = product

  const addToCart = useAddToCart({
    product,
    variationSelectorState,
    infoSocket
  })

  return (
    <div
      onClick={() => {
        if (fullScreen) handleFullScreen()
        addToCart()
      }}
      className={styles.productItemContent}
    >
      <div className={styles.pictureContent}>
        <div className={styles.productLink}>
          <img className={styles.picture} src={imageUrl} />
        </div>
      </div>
      <div
        className={`${styles.productDeatailContent} ${styles.flexAlignItemsCenter}`}
      >
        <span className={styles.priceWithDiscount}>
          {currencyFormat(priceWithDiscount)}
        </span>
      </div>
    </div>
  )
}
