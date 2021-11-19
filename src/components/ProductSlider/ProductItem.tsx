import React from 'react'

import { currencyFormat } from '../../utils'
import ProductVariationButton from '../ProductsButton/ProductVariationButton'
import ProductButton from './../ProductsButton/ProductButton'
import { KuikPayButton } from './../ProductsButton/KuikPayButton'

import styles from './productSlider.css'
import { FormattedMessage } from 'react-intl'

type ProductItemProps = {
  id: string
  name: string
  price: number
  priceWithDiscount: number
  imageUrl: string
  addToCartLink: string
  isAvailable: boolean
  pdp: boolean
  pdpLink: string
  variationSelector: []
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  skuId: string
  originOfProducts: string
  kuikpay: boolean
  sectionIdClickedOn?: string
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
    pdpLink,
    variationSelector,
    setShowVariation,
    skuId,
    originOfProducts,
    kuikpay,
    sectionIdClickedOn
  } = props

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
        <h4 className={styles.productTitle}>{name}</h4>
        {price !== priceWithDiscount && (
          <span className={styles.price}>
            <FormattedMessage id='store/text.before' /> :{' '}
            {currencyFormat(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          <FormattedMessage id='store/text.now' /> :{' '}
          {currencyFormat(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          {variationSelector.length === 0 ? (
            <ProductButton
              addToCartLink={addToCartLink}
              isAvailable={isAvailable}
              pdp={pdp}
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
          {kuikpay && originOfProducts !== 'platform' && (
            <KuikPayButton productId={skuId} />
          )}
        </div>
      </div>
    </div>
  )
}
