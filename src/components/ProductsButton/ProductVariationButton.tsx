import React, { Fragment } from 'react'

import styles from './productButton.css'

type ProductButtonProps = {
  isAvailable: boolean
  productId: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  sectionIdClickedOn: string | undefined
  productName: string
}

const ProductVariationButton = (props: ProductButtonProps) => {
  const {
    isAvailable,
    setShowVariation,
    productId,
    sectionIdClickedOn,
    productName
  } = props

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
        onClick={() => {
          setShowVariation(productId)
          const eventAddToCart = JSON.stringify({
            sectionIdClickedOn,
            productId,
            productName
          })

          localStorage.setItem('sectionIdClickedOnForAddToCart', eventAddToCart)
        }}
      >
        {isAvailable ? 'Agregar' : 'Agotado'}
      </button>
    </Fragment>
  )
}

export default ProductVariationButton
