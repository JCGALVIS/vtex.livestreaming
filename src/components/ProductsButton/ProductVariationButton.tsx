import React, { Fragment } from 'react'

import styles from './productButton.css'

type ProductButtonProps = {
  isAvailable: boolean
  productId: string
}

const ProductVariationButton = (props: ProductButtonProps) => {
  const { isAvailable } = props

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
      >
        {isAvailable ? 'Agregar' : 'Indisponible'}
      </button>
    </Fragment>
  )
}

export default ProductVariationButton
