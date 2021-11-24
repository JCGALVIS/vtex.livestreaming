import React, { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { addToCart } from '../../utils'

import styles from './productButton.css'

type ProductButtonProps = {
  addToCartLink: string
  handleClose?: () => void
  isAvailable: boolean
  pdp: boolean
  productId: string
  productName?: string
  sectionIdClickedOn?: string
  isInGlobalPage: boolean
}

const ProductButton = (props: ProductButtonProps) => {
  const {
    addToCartLink,
    handleClose,
    isAvailable,
    pdp,
    productId,
    productName,
    sectionIdClickedOn,
    isInGlobalPage
  } = props

  const { formatMessage } = useIntl()

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
        onClick={() => {
          addToCart(productId, pdp, isInGlobalPage)

          if (handleClose) handleClose()
          if (!sectionIdClickedOn) return

          const eventAddToCart = JSON.stringify({
            sectionIdClickedOn,
            productId,
            productName
          })

          localStorage.setItem('sectionIdClickedOnForAddToCart', eventAddToCart)
        }}
      >
        {isAvailable
          ? formatMessage({ id: 'store/text.add' })
          : formatMessage({ id: 'store/text.not-stock' })}
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
