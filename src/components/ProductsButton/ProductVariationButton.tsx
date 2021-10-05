import React, { Fragment } from 'react'

import styles from './productButton.css'

type ProductButtonProps = {
  isAvailable: boolean
  productId: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
}

const ProductVariationButton = (props: ProductButtonProps) => {
  const { isAvailable, setShowVariation, productId } = props

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
        onClick={() => setShowVariation(productId)}
      >
        {isAvailable ? 'Agregar' : 'Indisponible'}
      </button>
    </Fragment>
  )
}

export default ProductVariationButton
