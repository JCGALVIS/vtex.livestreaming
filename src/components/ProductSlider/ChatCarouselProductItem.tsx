import React, { useContext } from 'react'
import { ActionsContext, SettingContext } from '../../context'
import type { Product } from '../../typings/livestreaming'
import { addToCartHandler, currencyFormat } from '../../utils'
import styles from './productSlider.css'

type ChatCarouselProductItemProps = {
  product: Product
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  sectionIdClickedOn?: string
  fullScreen: boolean
  handleFullScreen: () => void
}

export const ChatCarouselProductItem = (
  props: ChatCarouselProductItemProps
) => {
  const { product, setShowVariation, fullScreen, handleFullScreen } = props
  const { id, priceWithDiscount, imageUrl } = product
  const { setAlertMessage } = useContext(SettingContext)

  const {
    setting: {
      showQuickView,
      addToCart: addToCartCallback,
      redirectTo: openProductDetail
    }
  } = useContext(ActionsContext)

  return (
    <div
      onClick={() => {
        if (fullScreen) handleFullScreen()

        if (showQuickView && !openProductDetail) {
          setShowVariation(id)
        } else {
          const message = addToCartHandler({
            product,
            openProductDetail,
            addToCartCallback
          })

          if (message) setAlertMessage(message)
        }
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
