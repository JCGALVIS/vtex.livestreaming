import React, { useState, Fragment, useEffect, useContext } from 'react'

// eslint-disable-next-line no-unused-vars
import { InfoSocket } from '../../typings/livestreaming'
import { useHighlightProduct } from '../../hooks/useHighlightProduct'

import styles from './highlightProduct.css'
import { ActionsContext } from '../../context/ActionsContext'
interface HighlightProductProps {
  collectionId: string | undefined
  fullScreen: boolean
  handleFullScreen: () => void
  infoSocket: InfoSocket
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  isFinalized: boolean
}

const HighlightProduct = ({
  collectionId,
  fullScreen,
  handleFullScreen,
  infoSocket,
  setShowVariation,
  isFinalized
}: HighlightProductProps) => {
  const [show, setShow] = useState<boolean | undefined>(false)
  const [optionHighlight, setOptionHighlight] = useState<string | undefined>()
  const { ivsRealTime, highlightProduct } = infoSocket

  const {
    setting: { originOfProducts }
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
