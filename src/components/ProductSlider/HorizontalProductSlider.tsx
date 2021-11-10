import React, { useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from '../../hooks/useFetchProducts'

import styles from './productSlider.css'
import ArrowRightLivestreaming from '../icons/ArrowRightLivestreaming'

type HorizontalProductSliderProps = {
  collectionId: string | undefined
  time?: number
  infinite?: boolean
  pdp: boolean
  originOfProducts: string | undefined
  kuikpay: boolean
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
}

export const HorizontalProductSlider = ({
  collectionId,
  time,
  infinite,
  pdp,
  originOfProducts,
  kuikpay,
  setShowVariation,
  transmitionType
}: HorizontalProductSliderProps) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const [itemsProdcuts, setItemsProdcuts] = useState([
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
  const [index, setIndex] = useState(3)
  const { data: products, loading } = useFetchProducts({
    collectionId,
    originOfProducts
  })

  const delay = time ? time * 1000 : 10000

  useEffect(() => {
    if (transmitionType === 'vertical') {
      setIndex(1)
    } else {
      setIndex(3)
    }
  }, [transmitionType])

  useEffect(() => {
    if (products && products[0]) {
      setItemsProdcuts(products.slice(0, index))
      setSelectedProductIndex(0)
    }
  }, [products])

  useEffect(() => {
    if (loading) return
    if (!infinite) return

    const timeout = setTimeout(() => {
      handleRightClick()
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [infinite, delay, loading, itemsProdcuts, selectedProductIndex])

  const handleProductMovement = (newIdx: number) => {
    if (products && products.length > 0) {
      setSelectedProductIndex(newIdx)

      if (products.length >= newIdx + index) {
        setItemsProdcuts(products.slice(newIdx, newIdx + index))
      } else {
        setItemsProdcuts(products.slice(0, index))
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
                  pdp={pdp}
                  originOfProducts={originOfProducts}
                  setShowVariation={setShowVariation}
                  kuikpay={kuikpay}
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
