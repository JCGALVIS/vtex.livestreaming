/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { ArrowRightLivestreaming } from '../icons'
import { ActionsContext, SettingContext } from '../../context'
import { Products } from '../../typings/livestreaming'

import styles from './productSlider.css'
import { Spinner } from '..'

type HorizontalProductSliderProps = {
  setShowVariation: React.Dispatch<React.SetStateAction<string>>
  transmitionType: string | undefined
}

export const HorizontalProductSlider = ({
  setShowVariation,
  transmitionType
}: HorizontalProductSliderProps) => {
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const [itemsProdcuts, setItemsProducts] = useState<Products[]>()
  const [index, setIndex] = useState(2)

  const { collectionId, setCollection } = useContext(SettingContext)

  const {
    setting: { isInfinite, time }
  } = useContext(ActionsContext)

  const { products, loading } = useFetchProducts({
    collectionId, setCollection
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
    if (!products || !isInfinite) return

    const timeout = setTimeout(() => {
      handleRightClick()
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [isInfinite, delay, products, itemsProdcuts, selectedProductIndex, index])

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
      if (newIdx < 0 && itemsProdcuts) {
        newIdx = products.length - itemsProdcuts.length
      }

      handleProductMovement(newIdx)
    }
  }

  return loading ? (
    <div className={styles.loader}>
      <Spinner />
    </div>
  ) : products ? (
    <div className={styles.horizontalProductContainer}>
      <button className={styles.arrowLeft} onClick={handleLeftClick}>
        <ArrowRightLivestreaming size='40' viewBox='0 0 400 400' />
      </button>
      <TransitionGroup className={styles.horizontalProductListContent}>
        {itemsProdcuts &&
          itemsProdcuts.length > 0 &&
          itemsProdcuts.map((product: any) => (
            <CSSTransition
              key={product.id}
              classNames={styles.slide}
              timeout={100}
            >
              <div className={styles.horizontalProductList}>
                <ProductItem
                  product={product}
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
