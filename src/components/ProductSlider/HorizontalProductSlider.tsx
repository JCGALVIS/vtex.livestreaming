/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { ArrowRightLivestreaming } from '../icons'
import { ActionsContext, SettingContext } from '../../context'

import styles from './productSlider.css'

type HorizontalProductSliderProps = {
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
}

export const HorizontalProductSlider = ({
  setShowVariation,
  transmitionType
}: HorizontalProductSliderProps) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const [itemsProdcuts, setItemsProducts] = useState([
    {
      id: '',
      name: '',
      price: 0,
      priceWithDiscount: 0,
      imageUrl: '',
      addToCartLink: '',
      isAvailable: false,
      variationSelector: [],
      pdpLink: ''
    }
  ])
  const [index, setIndex] = useState(2)

  const { collectionId } = useContext(SettingContext)

  const {
    setting: { isInfinite, originOfProducts, time }
  } = useContext(ActionsContext)

  const { data: products, loading } = useFetchProducts({
    collectionId
  })

  const delay = time ? time * 1000 : 10000

  useEffect(() => {
    if (transmitionType === 'vertical') {
      setIndex(1)
    } else {
      setIndex(2)
    }
  }, [transmitionType])

  useEffect(() => {
    if (products && products[0]) {
      setItemsProducts([])
      setItemsProducts(products.slice(0, index))
      setSelectedProductIndex(0)
    }
  }, [products, index])

  useEffect(() => {
    if (loading) return
    if (!isInfinite) return

    const timeout = setTimeout(() => {
      handleRightClick()
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [isInfinite, delay, loading, itemsProdcuts, selectedProductIndex, index])

  const handleProductMovement = (newIdx: number) => {
    if (products && products.length > 0) {
      setSelectedProductIndex(newIdx)

      if (products.length >= newIdx + index) {
        setItemsProducts(products.slice(newIdx, newIdx + index))
      } else {
        setItemsProducts(products.slice(0, index))
        setSelectedProductIndex(0)
      }
    }
  }

  const handleRightClick = () => {
    if (products && products.length > 0) {
      const newIdx = selectedProductIndex + 1
      handleProductMovement(newIdx)
    }
  }

  const handleLeftClick = () => {
    if (products && products.length > 0) {
      let newIdx = selectedProductIndex - 1
      if (newIdx < 0) {
        newIdx = products.length - itemsProdcuts.length
      }

      handleProductMovement(newIdx)
    }
  }

  return !loading ? (
    <div className={styles.horizontalProductContainer}>
      <button className={styles.arrowLeft} onClick={handleLeftClick}>
        <ArrowRightLivestreaming size='40' viewBox='0 0 400 400' />
      </button>
      <TransitionGroup className={styles.horizontalProductListContent}>
        {itemsProdcuts.length > 0 &&
          itemsProdcuts.map((product: any) => (
            <CSSTransition
              key={product.id}
              classNames={styles.slide}
              timeout={100}
            >
              <div className={styles.horizontalProductList}>
                <ProductItem
                  {...product}
                  originOfProducts={originOfProducts}
                  setShowVariation={setShowVariation}
                  sectionIdClickedOn='live_shopping_carousel'
                />
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
      <button className={styles.arrowRight} onClick={handleRightClick}>
        <ArrowRightLivestreaming size='40' viewBox='0 0 400 400' />
      </button>
    </div>
  ) : null
}
