import React from 'react'

import { formatterDolar } from './../../utils/getFormatMoney'
import styles from './productSlider.css'

type ProductItemProps = {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  isAvailable: boolean
}
export const ProductItem = (props: ProductItemProps) => {
  const {
    name,
    price,
    priceWithDiscount,
    imageUrl,
    addToCartLink,
    isAvailable
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
        <span className={styles.price}>De {formatterDolar.format(price)}</span>
        <span className={styles.priceWithDiscount}>
          Para {formatterDolar.format(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          <button
            className={`${styles.productAddCart} ${
              !isAvailable && styles.noActive
            }`}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Ver' : 'Indisponible'}
          </button>
          <div>
            <a
              id='add-cart'
              target='_blank'
              rel='noreferrer'
              href={addToCartLink}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
