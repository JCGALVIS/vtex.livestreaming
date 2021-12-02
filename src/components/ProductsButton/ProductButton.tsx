/* eslint-disable no-unused-vars */
import React, { Fragment, useContext } from 'react'
import { useIntl } from 'react-intl'
import { ActionsContext } from '../../context'
import { InfoSocket } from '../../typings/livestreaming'
import { addToCart } from '../../utils'

import styles from './productButton.css'

type ProductButtonProps = {
  addToCartLink: string
  handleClose?: () => void
  imageUrl: string
  infoSocket: InfoSocket
  isAvailable: boolean
  productId: string
  productName?: string
  sectionIdClickedOn?: string
}

const ProductButton = (props: ProductButtonProps) => {
  const {
    addToCartLink,
    handleClose,
    imageUrl,
    infoSocket,
    isAvailable,
    productId,
    productName,
    sectionIdClickedOn
  } = props

  const { socket, setProductsInCart } = infoSocket

  const { formatMessage } = useIntl()

  const {
    setting: { isInGlobalPage, redirectTo }
  } = useContext(ActionsContext)

  return (
    <Fragment>
      <button
        className={`${styles.productAddCart} ${
          !isAvailable && styles.noActive
        }`}
        disabled={!isAvailable}
        onClick={() => {
          if (socket && socket?.readyState === 1) {
            setProductsInCart((prev) => [
              ...prev,
              {
                id: '',
                name: '',
                price: 0,
                priceWithDiscount: 0,
                imageUrl: imageUrl,
                addToCartLink: '',
                isAvailable: false
              }
            ])
            const sendLike = {
              action: 'sendaddtocart',
              data: {
                imageUrl: imageUrl
              }
            }

            socket.send(JSON.stringify(sendLike))
          }

          addToCart(productId, redirectTo, isInGlobalPage)

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
