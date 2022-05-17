import classNames from 'clsx'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { ActionsContext, SettingContext } from '../../context'
import type { Product } from '../../typings/livestreaming'
import { addToCartHandler } from '../../utils'
import styles from './productButton.css'

type ProductButtonProps = {
  product: Product
  sectionIdClickedOn?: string
  openVariationSelector?: () => void
  handleClose?: () => void
}

export const ProductButton = (props: ProductButtonProps) => {
  const { product, sectionIdClickedOn, handleClose, openVariationSelector } =
    props
  const { id, imageUrl, name, isAvailable } = product
  const { infoSocket, setAlertMessage } = useContext(SettingContext)
  const { socket } = infoSocket || {}
  const { formatMessage } = useIntl()

  const {
    setting: {
      showQuickView,
      addToCart: addToCartCallback,
      redirectTo: openProductDetail
    }
  } = useContext(ActionsContext)

  const handleClick = () => {
    if (socket && socket?.readyState === 1 && !openProductDetail) {
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

    if (showQuickView && openVariationSelector && !openProductDetail) {
      openVariationSelector()
    } else {
      const message = addToCartHandler({
        product,
        openProductDetail,
        addToCartCallback
      })

      if (message) setAlertMessage(message)
    }

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
