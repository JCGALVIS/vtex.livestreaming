import classNames from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'
import { useSettings } from '../../context'
import { useAddToCart } from '../../hooks'
import type { Product } from '../../../typings/livestreaming'
import styles from './productButton.module.css';

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

  const { id, name, isAvailable } = product
  const { infoSocket } = useSettings()
  const { formatMessage } = useIntl()

  const addToCart = useAddToCart({
    product,
    variationSelectorState,
    infoSocket
  })

  const handleClick = () => {
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
