import React, { Fragment, useEffect, useState } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { useFetchProductById } from '../../hooks/useFetchProductById'
import { formatterDolar } from '../../utils'
import { NumericStepper } from '../commonComponents'
import { ColorVariation } from './ColorVariation'
import { SizeVariations } from './SizeVariations'

import styles from './variationSelector.css'
import ProductButton from '../ProductsButton/ProductButton'

type VariationSelectorProps = {
  showVariation: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  pdp: boolean
}

export const VariationSelector = (props: VariationSelectorProps) => {
  const { showVariation, setShowVariation, pdp } = props
  const [productId, setProductId] = useState('')
  const [show, setShow] = useState(false)
  const [colorData, setColorData] = useState([
    { id: '', name: '', position: 0 }
  ])
  const [sizeData, setSizeData] = useState([{ id: '', name: '', position: 0 }])
  const [productData, setProductData] = useState({
    id: '',
    name: '',
    price: 0,
    priceWithDiscount: 0,
    imageUrl: '',
    addToCartLink: '',
    isAvailable: false,
    variationSelector: [
      {
        field: { id: 0, isActive: true, name: '', position: 0, type: '' },
        values: [{ id: '', name: '', position: 0 }]
      }
    ]
  })

  const product = useFetchProductById({
    productId
  })

  useEffect(() => {
    if (showVariation) setProductId(showVariation)
  }, [showVariation])

  useEffect(() => {
    if (product) {
      const color = product.data.variationSelector.find(
        (item) => item.field.name === 'Color'
      )

      const size = product.data.variationSelector.find(
        (item) => item.field.name === 'Talla'
      )

      if (color) setColorData(color?.values)

      if (size) setSizeData(size?.values)

      setProductData(product.data)

      setShow(product.loading !== true)
    }
  }, [product])

  const handleClose = () => {
    setShow(false)
    setShowVariation('')
  }

  return (
    <Transition in={show} timeout={150}>
      <CSSTransition in={show} timeout={100} unmountOnExit>
        <Fragment>
          <div className={styles.variationSelector}>
            <div className={styles.container}>
              <div className={styles.content}>
                <div className={styles.productDetail}>
                  <button className={styles.closeCardBtn} onClick={handleClose}>
                    <IconClose />
                  </button>
                  <div className={styles.productPictureContainer}>
                    <img
                      className={styles.productPicture}
                      src={productData.imageUrl}
                    />
                  </div>
                  <div className={styles.productDetailInfo}>
                    <div className={styles.productContainer}>
                      <div className={styles.productInfo}>
                        <h2 className={styles.productTitle}>
                          {productData.name}
                        </h2>
                        <span>
                          <span className={styles.productPrice}>
                            {formatterDolar.format(productData.price)}
                          </span>
                        </span>
                        <span className={styles.productDiscountPrice}>
                          {formatterDolar.format(productData.priceWithDiscount)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <ColorVariation colorData={colorData} />
                      </div>
                      <div className={styles.variationContent}>
                        <SizeVariations sizeData={sizeData} />
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <NumericStepper />
                        <div className={styles.buttonGroup}>
                          <ProductButton
                            productId={productData.id}
                            addToCartLink={productData.addToCartLink}
                            isAvailable={productData.isAvailable}
                            pdp={pdp}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.backdropContainer} onClick={handleClose} />
          </div>
        </Fragment>
      </CSSTransition>
    </Transition>
  )
}
