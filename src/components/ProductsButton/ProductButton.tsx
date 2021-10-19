import React, { Fragment } from 'react'
import { addToCart } from '../../utils'

import styles from './productButton.css'

type ProductButtonProps = {
  addToCartLink: string
  isAvailable: boolean
  pdp: boolean
  productId: string
  sectionIdClickedOn?: string
}

const ProductButton = (props: ProductButtonProps) => {
  const { addToCartLink, isAvailable, pdp, productId, sectionIdClickedOn } =
    props

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
        onClick={() => {
          addToCart(productId, pdp)
          if (!sectionIdClickedOn) return
          localStorage.setItem(
            'sectionIdClickedOnForAddToCart',
            sectionIdClickedOn
          )
        }}
      >
        {isAvailable ? 'Agregar' : 'Indisponible'}
      </button>
      <div>
        <a
          id={`add-cart-${productId}`}
          className='add-cart'
          target='_blank'
          rel='noreferrer'
          href={addToCartLink}
        />
      </div>
    </Fragment>
  )
}

export default ProductButton
