import React, { useState, Fragment, useEffect } from 'react'
import IconClose from '@vtex/styleguide/lib/icon/Close'

// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import { useHighlightProduct } from '../../hooks/useHighlightProduct'

import styles from './highlightProduct.css'
import ProductButton from '../ProductsButton/ProductButton'
import ProductVariationButton from '../ProductsButton/ProductVariationButton'
import { KuikPayButton } from './../ProductsButton/KuikPayButton'

import { currencyFormat } from '../../utils'
interface HighlightProductProps {
  infoSocket: InfoSocket
  collectionId: string | undefined
  pdp: boolean
  originOfProducts: string | undefined
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  kuikpay: boolean
}

const HighlightProduct = ({
  infoSocket,
  collectionId,
  pdp,
  originOfProducts,
  setShowVariation,
  kuikpay
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()
  const { ivsRealTime, highlightProduct } = infoSocket

  const { product, showProduct, handlerCloseCard } = useHighlightProduct({
    highlightProduct,
    collectionId,
    originOfProducts
  })

  useEffect(() => {
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setShow(showProduct)
      return
    }
    setShow(false)
  }, [ivsRealTime, showProduct])

  useEffect(() => {
    if (highlightProduct?.backgroundWhiteHighlight)
      localStorage.setItem(
        'backgroundWhiteHighlight',
        highlightProduct?.backgroundWhiteHighlight
      )

    const backgroundWhiteHighlight = localStorage.getItem(
      'backgroundWhiteHighlight'
    )

    if (backgroundWhiteHighlight) {
      setOptionHighlight(backgroundWhiteHighlight)
    } else {
      setOptionHighlight(highlightProduct?.backgroundWhiteHighlight)
    }
  }, [highlightProduct?.backgroundWhiteHighlight])

  return (
    <Fragment>
      {show ? (
        <div
          className={`${styles.highlightProductContainer}  ${
            !optionHighlight || optionHighlight === 'white'
              ? styles.white
              : styles.black
          }`}
          id='highlightProductContainer'
        >
          <button
            className={`${styles.closeCardBtn} ${
              !optionHighlight || optionHighlight === 'white'
                ? styles.closeCardBtnWhite
                : styles.closeCardBtnBlack
            }`}
            onClick={handlerCloseCard}
          >
            <IconClose />
          </button>
          <div className={styles.productContainer}>
            <a
              className={styles.º}
              href={product.pdpLink}
              target='_blank'
              rel='noreferrer'
            >
              <img className={styles.productPicture} src={product.imageUrl} />
            </a>
            <div
              className={`${styles.productInfo} ${
                !optionHighlight || optionHighlight === 'white'
                  ? styles.textBlack
                  : styles.textWhite
              }`}
            >
              <p className={styles.productTitle}>{product.name}</p>
              <div className={styles.productPriceContainer}>
                <div>
                  {product.price !== product.priceWithDiscount && (
                    <p className={styles.productPrice}>
                      {currencyFormat(product.price)}
                    </p>
                  )}
                  <p className={styles.productDiscounted}>
                    {currencyFormat(product.priceWithDiscount)}
                  </p>
                </div>
                <div className={styles.productAddCartContent}>
                  {product.variationSelector.length === 0 ? (
                    <ProductButton
                      addToCartLink={product.addToCartLink}
                      isAvailable={product.isAvailable}
                      pdp={pdp}
                      productId={product.id}
                      productName={product.name}
                      sectionIdClickedOn='live_shopping_highlight_product'
                    />
                  ) : (
                    <ProductVariationButton
                      isAvailable={product.isAvailable}
                      productId={product.id}
                      setShowVariation={setShowVariation}
                      sectionIdClickedOn='live_shopping_highlight_product'
                      productName={product.name}
                    />
                  )}
                  {kuikpay && originOfProducts !== 'platform' && (
                    <KuikPayButton productId={product.id} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
