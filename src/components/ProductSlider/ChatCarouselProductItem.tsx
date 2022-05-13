/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'

import { handlerAddToCart, currencyFormat } from '../../utils'
import { ActionsContext } from '../../context/ActionsContext'
import type { Products } from '../../typings/livestreaming'

import styles from './productSlider.css'

type ChatCarouselProductItemProps = {
  product: Products
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

  const {
    setting: { addToCart, showQuickView, redirectTo }
  } = useContext(ActionsContext)

  return (
    <div
      onClick={() => {
        if (fullScreen) handleFullScreen()
        if (showQuickView) {
          setShowVariation(id)
        } else {
          handlerAddToCart(
            addToCart,
            product,
            redirectTo,
            showQuickView
          )
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
