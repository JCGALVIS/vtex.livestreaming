import React, { useEffect, useState } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from '../../hooks/useFetchProducts'

import styles from './productSlider.css'
import ArrowRightLivestreaming from '../icons/ArrowRightLivestreaming'

type HorizontalProductSliderProps = {
  collectionId: string | undefined
  time: number
  infinite: boolean
}

export const HorizontalProductSlider = ({
  collectionId,
  time,
  infinite
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
      isAvailable: false
    }
  ])
  const { data: products, loading } = useFetchProducts({ collectionId })

  const delay = time * 1000

  useEffect(() => {
    if (products && products[0]) {
      setItemsProdcuts(products.slice(0, 3))
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
  }, [infinite, delay, loading, itemsProdcuts])

  const handleProductMovement = (newIdx: number) => {
    if (products && products.length > 0) {

      setSelectedProductIndex(newIdx)

      if (products.length >= newIdx + 3) {
        setItemsProdcuts(products.slice(newIdx, newIdx + 3))
      } else {
        setItemsProdcuts(products.slice(0, 3))
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

  return (
    <div className={styles.horizontalProductContainer}>
      <button className={styles.arrowLeft} onClick={handleLeftClick}>
        <ArrowRightLivestreaming size='40' viewBox='0 0 400 400' />
      </button>
      <TransitionGroup className={styles.horizontalProductListContent}>
        {!loading &&
          itemsProdcuts.length > 0 &&
          itemsProdcuts.map((product: any) => (
            <CSSTransition
              key={product.id}
              classNames={styles.slide}
              timeout={100}
            >
              <div className={styles.horizontalProductList}>
                <ProductItem {...product} />
              </div>
            </CSSTransition>
          ))}
      </TransitionGroup>
      <button className={styles.arrowRight} onClick={handleRightClick}>
        <ArrowRightLivestreaming size='40' viewBox='0 0 400 400' />
      </button>
    </div>
  )
}
