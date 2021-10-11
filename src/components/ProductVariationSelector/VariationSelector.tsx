import React, { Fragment, useEffect, useState } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { useFetchProductById } from '../../hooks/useFetchProductById'
import { formatterDolar } from '../../utils'
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
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState({
    color: '',
    size: '',
    imageUrl: '',
    addToCartLink: '',
    isAvailable: true
  })
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
    items: [],
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

  useEffect(() => {
    const items = productData.items.map((item: any) => {
      return {
        color: item.Color[0],
        size: item.Talla[0],
        imageUrl: item.images[0].imageUrl,
        addToCartLink: item.sellers[0].addToCartLink,
        isAvailable: item.sellers[0]?.commertialOffer.IsAvailable
      }
    })

    const productItem = items.find(
      (item) => item.color === selectedColor && item.size === selectedSize
    )

    setIsAvailable(!!productItem)
    setSelectedSize(productItem ? productItem.size : selectedSize)
    setSelectedColor(productItem ? productItem.color : selectedColor)

    if (productItem) setSelectedProduct(productItem)
  }, [selectedColor, selectedSize])

  const handleClose = () => {
    setShow(false)
    setShowVariation('')
    setProductId('')
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
                      src={selectedProduct.imageUrl}
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
                        <ColorVariation
                          colorData={colorData}
                          setSelectedColor={setSelectedColor}
                        />
                      </div>
                      <div className={styles.variationContent}>
                        <SizeVariations
                          sizeData={sizeData}
                          setSelectedSize={setSelectedSize}
                          selectedSize={selectedSize}
                        />
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <div className={styles.buttonGroup}>
                          <ProductButton
                            productId={productData.id}
                            addToCartLink={selectedProduct.addToCartLink}
                            isAvailable={
                              isAvailable ? selectedProduct.isAvailable : false
                            }
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
