import React, { useState, Fragment, useEffect, useContext } from 'react'

import { useHighlightProduct } from '../../hooks/useHighlightProduct'
import { ActionsContext, SettingContext } from '../../context'
import { handlerAddToCart } from '../../utils'
import { ProductButton } from '../ProductsButton/ProductButton'
import { ProductVariationButton } from '../ProductsButton/ProductVariationButton'

import styles from './highlightProduct.css'
interface HighlightProductProps {
  fullScreen: boolean
  handleFullScreen: () => void
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  isFinalized: boolean
}

const HighlightProduct = ({
  fullScreen,
  handleFullScreen,
  setShowVariation,
  isFinalized
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()

  const { collectionId, infoSocket } = useContext(SettingContext)

  const { ivsRealTime, highlightProduct } = infoSocket || {}

  const {
    setting: { addToCart, isInGlobalPage, redirectTo, showQuickView }
  } = useContext(ActionsContext)

  const { product, showProduct } = useHighlightProduct({
    highlightProduct,
    collectionId,
    isFinalized
  })

  useEffect(() => {
    if (ivsRealTime && ivsRealTime.status === 'LIVE') {
      setShow(showProduct)
      return
    }
    setShow(isFinalized ? showProduct : false)
  }, [ivsRealTime, showProduct, isFinalized])

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
      {collectionId && show && product ? (
        <div
          className={`${styles.highlightProductContainer}  ${
            !optionHighlight || optionHighlight === 'white'
              ? styles.white
              : styles.black
          }`}
          id='highlightProductContainer'
        >
          <div
            className={styles.productContainer}
            onClick={() => {
              if (fullScreen) handleFullScreen()
              if (showQuickView) {
                setShowVariation(product.id)
              } else {
                handlerAddToCart(
                  addToCart,
                  product,
                  redirectTo,
                  isInGlobalPage,
                  showQuickView
                )
              }
            }}
          >
            <img className={styles.productPicture} src={product.imageUrl} />
            <div className={styles.productAddCartContent}>
              {showQuickView ? (
                <ProductVariationButton
                  isAvailable={product.isAvailable}
                  productId={product.id}
                  setShowVariation={setShowVariation}
                  sectionIdClickedOn='live_shopping_highlight_product'
                  productName={product.name}
                />
              ) : (
                <ProductButton
                  product={product}
                  sectionIdClickedOn='live_shopping_highlight_product'
                />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
