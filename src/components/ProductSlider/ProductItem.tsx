import React from 'react'

import { formatterDolar } from '../../utils'
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
    pdp
  } = props

  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a className={styles.productLink} href={addToCartLink}>
          <img className={styles.picture} src={imageUrl} />
        </a>
      </div>
      <div className={styles.productDeatailContent}>
        <h4 className={styles.productTitle}>{name}</h4>
        {price !== priceWithDiscount && (
          <span className={styles.price}>
            De {formatterDolar.format(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          Para {formatterDolar.format(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          <ProductButton
            addToCartLink={addToCartLink}
            isAvailable={isAvailable}
            pdp={pdp}
            productId={id}
          />
        </div>
      </div>
    </div>
  )
}
