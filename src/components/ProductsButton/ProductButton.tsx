import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { ActionsContext, SettingContext } from '../../context'
import type { Products } from '../../typings/livestreaming'
import { handlerAddToCart } from '../../utils'
import styles from './productButton.css'

type ProductButtonProps = {
  handleClose?: () => void
  product: Products
  sectionIdClickedOn?: string
}

export const ProductButton = (props: ProductButtonProps) => {
  const { handleClose, product, sectionIdClickedOn } = props

  const { id, imageUrl, name, addToCartLink, isAvailable, skuId } = product

  const { infoSocket, setMessageAlert } = useContext(SettingContext)
  const {
    setting: { addToCart }
  } = useContext(ActionsContext)

  const { socket } = infoSocket || {}

  const { formatMessage } = useIntl()

  const {
    setting: { isInGlobalPage, redirectTo, showQuickView }
  } = useContext(ActionsContext)

  return redirectTo ? (
    <a
      className={`add-cart ${`add-cart-${skuId || id}`} ${
        styles.productAddCart
      } ${!isAvailable && styles.noActive}`}
      target='_blank'
      rel='noreferrer'
      href={addToCartLink}
      style={{ ...(!isAvailable && { pointerEvents: 'none' }) }}
    >
      {isAvailable
        ? formatMessage({ id: 'store/text.add' })
        : formatMessage({ id: 'store/text.not-stock' })}
    </a>
  ) : (
    <button
      className={`${styles.productAddCart} ${!isAvailable && styles.noActive}`}
      disabled={!isAvailable}
      onClick={() => {
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

        const returnMessage = handlerAddToCart(
          addToCart,
          product,
          redirectTo,
          isInGlobalPage,
          showQuickView
        )

        if (setMessageAlert) setMessageAlert(returnMessage)

        if (handleClose) handleClose()
        if (!sectionIdClickedOn) return

        const eventAddToCart = JSON.stringify({
          sectionIdClickedOn,
          id,
          name
        })

        localStorage.setItem('sectionIdClickedOnForAddToCart', eventAddToCart)
      }}
    >
      {isAvailable
        ? formatMessage({ id: 'store/text.add' })
        : formatMessage({ id: 'store/text.not-stock' })}
    </button>
  )
}
