import React, { useState, Fragment, useEffect, useContext } from 'react'

import { useHighlightProduct } from '../../hooks/useHighlightProduct'
import { ActionsContext, SettingContext } from '../../context'

import styles from './highlightProduct.css'
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
