import classNames from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSettings } from '../../context'
import { useAddToCart } from '../../hooks'
import type { Product } from '../../typings/livestreaming'
import styles from './productButton.css'

type ProductButtonProps = {
  product: Product
  sectionIdClickedOn?: string
  variationSelectorState?: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ]
  handleClose?: () => void
}

export const ProductButton = (props: ProductButtonProps) => {
  const { product, sectionIdClickedOn, handleClose, variationSelectorState } =
    props

  const { id, imageUrl, name, isAvailable } = product
  const { infoSocket } = useSettings()
  const { socket } = infoSocket || {}
  const { formatMessage } = useIntl()

  const addToCart = useAddToCart({
    product,
    variationSelectorState
  })

  const handleClick = () => {
    if (socket && socket?.readyState === 1) {
      const currentCart = {
        action: 'sendaddtocart',
        data: {
          productId: id,
          name: name,
          imageUrl: imageUrl
        },
        sessionId: infoSocket?.sessionId,
        email: '-',
        orderForm: window?.vtexjs?.checkout?.orderForm?.orderFormId
      }

      socket.send(JSON.stringify(currentCart))
      sessionStorage.cartCachedOrderFormId = currentCart.orderForm
    }

    addToCart()

    if (handleClose) handleClose()

    if (sectionIdClickedOn) {
      const eventAddToCart = JSON.stringify({
        sectionIdClickedOn,
        id,
        name
      })

      localStorage.setItem('sectionIdClickedOnForAddToCart', eventAddToCart)
    }
  }

  return (
    <button
      className={classNames(
        styles.productAddCart,
        !isAvailable && styles.noActive
      )}
      disabled={!isAvailable}
      onClick={() => handleClick()}
    >
      {isAvailable
        ? formatMessage({ id: 'store/text.add' })
        : formatMessage({ id: 'store/text.not-stock' })}
    </button>
  )
}
