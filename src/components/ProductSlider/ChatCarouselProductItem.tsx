import React, { useContext } from 'react'

import { addToCart, currencyFormat } from '../../utils'
import { ActionsContext } from '../../context/ActionsContext'

import styles from './productSlider.css'

type ChatCarouselProductItemProps = {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  isAvailable: boolean
  pdpLink: string
  variationSelector: []
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  skuId: string
  sectionIdClickedOn?: string
  fullScreen: boolean
  handleFullScreen: () => void
}

export const ChatCarouselProductItem = (
  props: ChatCarouselProductItemProps
) => {
  const {
    id,
    priceWithDiscount,
    imageUrl,
    setShowVariation,
    fullScreen,
    handleFullScreen
  } = props

  const {
    setting: { isInGlobalPage, showQuickView, redirectTo }
  } = useContext(ActionsContext)

  return (
    <div
      onClick={() => {
        if (fullScreen) handleFullScreen()
        if (showQuickView) {
          setShowVariation(id)
        } else {
          addToCart(id, redirectTo, isInGlobalPage, showQuickView, id)
        }
      }}
      className={styles.productItemContent}
    >
      <div className={styles.pictureContent}>
        <a className={styles.productLink} href='#'>
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <span className={styles.priceWithDiscount}>
          {currencyFormat(priceWithDiscount)}
        </span>
      </div>
    </div>
  )
}
