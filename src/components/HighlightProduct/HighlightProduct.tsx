import React, { useState, Fragment, useEffect, useContext } from 'react'

import { useHighlightProduct } from '../../hooks/useHighlightProduct'
import { ActionsContext, SettingContext } from '../../context'

import styles from './highlightProduct.css'
import { addToCart } from '../../utils'
interface HighlightProductProps {
  fullScreen: boolean
  handleFullScreen: () => void
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}

const HighlightProduct = ({
  fullScreen,
  handleFullScreen,
  setShowVariation
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()

  const { collectionId, infoSocket } = useContext(SettingContext)

  const { ivsRealTime, highlightProduct } = infoSocket || {}

  const {
    setting: { isInGlobalPage, originOfProducts, redirectTo, showQuickView }
  } = useContext(ActionsContext)

  const { product, showProduct } = useHighlightProduct({
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
      {collectionId && show ? (
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
                addToCart(product.id, redirectTo, isInGlobalPage, showQuickView)
              }
            }}
          >
            <img className={styles.productPicture} src={product.imageUrl} />
            <div>
              <a
                id={`add-cart-${product.id}`}
                className='add-cart'
                target='_blank'
                rel='noreferrer'
                href={product.pdpLink}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
