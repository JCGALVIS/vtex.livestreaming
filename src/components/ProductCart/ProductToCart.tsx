/* eslint-disable no-unused-vars */
import React, { useMemo, Fragment } from 'react'

import type { InfoSocket } from '../../typings/livestreaming'
import { ProductCart } from './ProductCart'

interface ProductToCartProps {
  infoSocket: InfoSocket
}

export const ProductToCart = ({ infoSocket }: ProductToCartProps) => {
  const { productsInCart } = infoSocket

  const ProductCollection = useMemo(
    () =>
      productsInCart &&
      productsInCart.map((product, index) => (
        <ProductCart key={index} image={product.imageUrl} />
      )),
    [productsInCart]
  )

  return <Fragment>{ProductCollection}</Fragment>
}
