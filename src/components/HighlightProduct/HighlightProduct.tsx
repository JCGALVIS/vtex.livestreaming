import classNames from 'clsx'
import React, { Fragment, useEffect, useState } from 'react'
import { useSettings } from '../../context'
import { useHighlightProduct } from '../../hooks/useHighlightProduct'
import { ProductButton } from '../ProductsButton/ProductButton'
import styles from './highlightProduct.css'

interface HighlightProductProps {
  fullScreen: boolean
  handleFullScreen: () => void
  variationSelectorState: [string, React.Dispatch<React.SetStateAction<string>>]
  isFinalized: boolean
}

const HighlightProduct = ({
  fullScreen,
  handleFullScreen,
  variationSelectorState,
  isFinalized
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()
  const { collectionId, infoSocket, setCollection } = useSettings()
  const { ivsRealTime, highlightProduct } = infoSocket || {}

  const { product, showProduct } = useHighlightProduct({
    highlightProduct,
    collectionId,
    isFinalized,
    setCollection
  })

  useEffect(() => {
    if (ivsRealTime) {
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
          className={classNames(
            styles.highlightProductContainer,
            !optionHighlight || optionHighlight === 'white'
              ? styles.white
              : styles.black
          )}
          id='highlightProductContainer'
        >
          <div
            className={styles.productContainer}
            onClick={() => {
              if (fullScreen) handleFullScreen()
            }}
          >
            <img className={styles.productPicture} src={product.imageUrl} />
            <div className={styles.productAddCartContent}>
              <ProductButton
                product={product}
                sectionIdClickedOn='live_shopping_highlight_product'
                variationSelectorState={variationSelectorState}
              />
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
