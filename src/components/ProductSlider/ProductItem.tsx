import React from 'react'

import { formatterDolar } from '../../utils'
import ProductVariationButton from '../ProductsButton/ProductVariationButton'
import ProductButton from './../ProductsButton/ProductButton'

import styles from './productSlider.css'

type ProductItemProps = {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  isAvailable: boolean
  pdp: boolean
  variationSelector: []
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}
export const ProductItem = (props: ProductItemProps) => {
  const {
    id,
    name,
    price,
    priceWithDiscount,
    imageUrl,
    addToCartLink,
    isAvailable,
    pdp,
    variationSelector,
    setShowVariation
  } = props

  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a
          className={styles.productLink}
          href={addToCartLink}
          target='_blank'
          rel='noreferrer'
        >
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <h4 className={styles.productTitle}>{name}</h4>
        {price !== priceWithDiscount && (
          <span className={styles.price}>
            Antes: {formatterDolar.format(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          Ahora: {formatterDolar.format(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          {variationSelector.length === 0 ? (
            <ProductButton
              addToCartLink={addToCartLink}
              isAvailable={isAvailable}
              pdp={pdp}
              productId={id}
            />
          ) : (
            <ProductVariationButton
              isAvailable={isAvailable}
              productId={id}
              setShowVariation={setShowVariation}
            />
          )}
        </div>
      </div>
    </div>
  )
}
