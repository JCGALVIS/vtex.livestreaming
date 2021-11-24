/* eslint-disable no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react'
import { Transition, CSSTransition } from 'react-transition-group'
import IconClose from '@vtex/styleguide/lib/icon/Close'

import { useFetchProductById } from '../../hooks/useFetchProductById'
import { currencyFormat } from '../../utils'
import { ColorVariation } from './ColorVariation'
import { SizeVariations } from './SizeVariations'

import styles from './variationSelector.css'
import type { Values } from '../../typings/livestreaming'
import ProductButton from '../ProductsButton/ProductButton'

type VariationSelectorProps = {
  showVariation: string
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  pdp: boolean
  originOfProducts: string | undefined
}

export const VariationSelector = (props: VariationSelectorProps) => {
  const { showVariation, setShowVariation, pdp, originOfProducts } = props
  const [productId, setProductId] = useState('')
  const [show, setShow] = useState(false)
  const [selectedColor, setSelectedColor] = useState<Values[]>()
  const [selectedSize, setSelectedSize] = useState<Values[]>()
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState({
    imageUrl: '',
    addToCartLink: '',
    isAvailable: true,
    price: 0,
    priceWithDiscount: 0,
    skuId: ''
  })

  const { product, loading } = useFetchProductById({
    productId,
    originOfProducts
  })

  useEffect(() => {
    if (showVariation) setProductId(showVariation)
  }, [showVariation])

  useEffect(() => {
    if (loading) {
      setShow(loading)
    }
  }, [loading])

  useEffect(() => {
    setIsAvailable(true)

    const selectedVariations = selectedColor
      ? selectedColor?.concat(selectedSize || [])
      : selectedSize

    let filterProduct = product?.items
    let isVariation = ''
    const productSelect = selectedVariations?.map((variation) => {
      const items = filterProduct?.filter((item) => {
        isVariation = item[variation.variationName || '']

        if (isVariation)
          return item[variation.variationName || ''][0] === variation?.name

        return false
      })

      if (items?.length) {
        filterProduct = items
      } else {
        if (isVariation) setIsAvailable(false)
      }

      return filterProduct
    })

    if (productSelect) {
      const selectedProduct = filterProduct?.map((filter) => {
        return {
          imageUrl: filter.images[0].imageUrl,
          addToCartLink: filter.sellers[0].addToCartLink,
          isAvailable: filter.sellers[0]?.commertialOffer.IsAvailable,
          price: filter.sellers[0]?.commertialOffer.ListPrice,
          priceWithDiscount: filter.sellers[0]?.commertialOffer.Price,
          skuId: filter.itemId
        }
      })

      if (selectedProduct) setSelectedProduct(selectedProduct[0])
    }
  }, [selectedColor, selectedSize])

  useEffect(() => {
    if (!product?.variationSelector) {
      console.log('product: ', product)
      const selectedProduct = product?.items?.map((filter) => {
        return {
          imageUrl: filter.images[0].imageUrl,
          addToCartLink: filter.sellers[0].addToCartLink,
          isAvailable: filter.sellers[0]?.commertialOffer.IsAvailable,
          price: filter.sellers[0]?.commertialOffer.ListPrice,
          priceWithDiscount: filter.sellers[0]?.commertialOffer.Price,
          skuId: filter.itemId
        }
      })

      if (selectedProduct) setSelectedProduct(selectedProduct[0])
    }
  }, [product])

  const handleClose = () => {
    setShow(false)
    setShowVariation('')
    setProductId('')
    setSelectedSize([])
    setSelectedColor([])
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
                        <h2 className={styles.productTitle}>{product?.name}</h2>
                        <span>
                          <span className={styles.productPrice}>
                            {currencyFormat(selectedProduct?.price)}
                          </span>
                        </span>
                        <span className={styles.productDiscountPrice}>
                          {currencyFormat(selectedProduct?.priceWithDiscount)}
                        </span>
                      </div>
                    </div>
                    <div className={styles.productContainer}>
                      {show &&
                      product &&
                      product.variationSelector &&
                      product.variationSelector?.length > 0 ? (
                        <div className={styles.variationContent}>
                          <ColorVariation
                            variations={product.variationSelector || []}
                            setSelectedColor={setSelectedColor}
                          />
                        </div>
                      ) : null}

                      {show &&
                      product &&
                      product.variationSelector &&
                      product.variationSelector?.length > 0 ? (
                        <SizeVariations
                          variations={product.variationSelector || []}
                          setSelectedSize={setSelectedSize}
                          selectedSize={selectedSize || []}
                        />
                      ) : null}
                    </div>
                    <div className={styles.productContainer}>
                      <div className={styles.variationContent}>
                        <div className={styles.buttonGroup}>
                          <ProductButton
                            addToCartLink={selectedProduct.addToCartLink}
                            handleClose={handleClose}
                            isAvailable={
                              isAvailable ? selectedProduct.isAvailable : false
                            }
                            pdp={pdp}
                            productId={selectedProduct.skuId}
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
