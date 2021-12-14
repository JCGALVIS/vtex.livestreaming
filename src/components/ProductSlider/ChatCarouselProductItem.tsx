import React, { useContext } from 'react'

import { currencyFormat } from '../../utils'
import ProductVariationButton from '../ProductsButton/ProductVariationButton'
import ProductButton from '../ProductsButton/ProductButton'
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
}

export const ChatCarouselProductItem = (
  props: ChatCarouselProductItemProps
) => {
  const {
    id,
    name,
    priceWithDiscount,
    imageUrl,
    addToCartLink,
    isAvailable,
    pdpLink,
    variationSelector,
    setShowVariation,
    skuId,
    sectionIdClickedOn
  } = props

  const {
    setting: { isInGlobalPage, showQuickView }
  } = useContext(ActionsContext)

  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a
          className={styles.productLink}
          href={pdpLink}
          target='_blank'
          rel='noreferrer'
        >
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <span className={styles.priceWithDiscount}>
          {currencyFormat(priceWithDiscount)}
        </span>
      </div>
      <div className={styles.productAddCartContent}>
        {variationSelector.length === 0 || isInGlobalPage || !showQuickView ? (
          <ProductButton
            addToCartLink={
              isInGlobalPage || !showQuickView ? pdpLink : addToCartLink
            }
            imageUrl={imageUrl}
            isAvailable={isAvailable}
            productId={skuId}
            productName={name}
            sectionIdClickedOn={sectionIdClickedOn}
          />
        ) : (
          <ProductVariationButton
            isAvailable={isAvailable}
            productId={id}
            setShowVariation={setShowVariation}
            sectionIdClickedOn={sectionIdClickedOn}
            productName={name}
          />
        )}
      </div>
    </div>
  )
}
