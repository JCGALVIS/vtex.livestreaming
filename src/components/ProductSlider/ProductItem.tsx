import React, { useContext } from 'react'
import { useIntl } from 'react-intl'

import { currencyFormat } from '../../utils'
import { ProductButton, ProductVariationButton } from '..'
import { KuikPayButton } from './../ProductsButton/KuikPayButton'
import { ActionsContext } from '../../context/ActionsContext'

import styles from './productSlider.css'

const SPANISH_CODE = 'es'
type ProductItemProps = {
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

export const ProductItem = (props: ProductItemProps) => {
  const {
    id,
    name,
    price,
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
    setting: { isInGlobalPage, kuikpay, originOfProducts, showQuickView }
  } = useContext(ActionsContext)

  const validateLink = (link: string) => {
    const hasWwwSubDomain = (link: string) => {
      if (link.indexOf('www') >= 0 || link.indexOf('WWW') >= 0) {
        return true
      } else {
        return false
      }
    }
    if (hasWwwSubDomain(link)) {
      return link
    } else {
      const urlScheme = link.indexOf('https://') >= 0 ? 'https://' : 'http://'
      const wwwSubDomain = 'www.'
      const validatedLink =
        link.slice(0, urlScheme.length) +
        wwwSubDomain +
        link.slice(urlScheme.length)
      return validatedLink
    }
  }

  const { formatMessage, locale } = useIntl()
  const isSpanish = locale === SPANISH_CODE
  return (
    <div className={styles.productItemContent}>
      <div className={styles.pictureContent}>
        <a
          className={styles.productLink}
          href={validateLink(pdpLink)}
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
            {isSpanish ? formatMessage({ id: 'store/text.before' }) + ': ' : ''}
            {currencyFormat(price)}
          </span>
        )}
        <span className={styles.priceWithDiscount}>
          {isSpanish ? formatMessage({ id: 'store/text.now' }) + ': ' : ''}
          {currencyFormat(priceWithDiscount)}
        </span>
        <div className={styles.productAddCartContent}>
          {variationSelector.length === 0 ||
          isInGlobalPage ||
          !showQuickView ? (
            <ProductButton
              addToCartLink={
                !showQuickView || isInGlobalPage
                  ? validateLink(pdpLink)
                  : validateLink(addToCartLink)
              }
              imageUrl={imageUrl}
              isAvailable={isAvailable}
              productId={skuId}
              id={id}
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
