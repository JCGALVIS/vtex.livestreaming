import React, { Fragment } from 'react'
import { useIntl } from 'react-intl'
import styles from './productButton.css'

type ProductButtonProps = {
  isAvailable: boolean
  productId: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  sectionIdClickedOn: string | undefined
  productName: string
}

const ProductVariationButton = (props: ProductButtonProps) => {
  const {
    isAvailable,
    setShowVariation,
    productId,
    sectionIdClickedOn,
    productName
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
          setShowVariation(productId)
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
    </Fragment>
  )
}

export default ProductVariationButton
