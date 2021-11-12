import React, { useState, Fragment, useEffect } from 'react'

// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import { useHighlightProduct } from '../../hooks/useHighlightProduct'

import styles from './highlightProduct.css'
interface HighlightProductProps {
  collectionId: string | undefined
  fullScreen: boolean
  handleFullScreen: () => void
  originOfProducts: string | undefined
  infoSocket: InfoSocket
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}

const HighlightProduct = ({
  collectionId,
  fullScreen,
  handleFullScreen,
  infoSocket,
  originOfProducts,
  setShowVariation
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()
  const { ivsRealTime, highlightProduct } = infoSocket

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
      {show ? (
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
              setShowVariation(product.id)
            }}
          >
            <img className={styles.productPicture} src={product.imageUrl} />
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default HighlightProduct
