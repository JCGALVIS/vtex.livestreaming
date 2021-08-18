import React, { useEffect, useRef, useState } from 'react'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from './../../hooks/useFetchProducts'

import styles from './productSlider.css'

type VerticalProductSliderProps = {
  collectionId: string | undefined
  time?: number
  infinite?: boolean
}

export const VerticalProductSlider = ({
  collectionId,
  time,
  infinite
}: VerticalProductSliderProps) => {
  const { data: products, loading } = useFetchProducts({ collectionId })
  const [isMouseOver, setIsMouseOver] = useState(false)
  const delay = time ? time * 1000 : 10000
  const [indexScroll, setIndexScroll] = useState(0)
  const productLisRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loading) return
    if (!infinite) return
    if (!productLisRef?.current) return
    if (isMouseOver) return

    const current = productLisRef?.current

    const productDivs = current.children

    const timeout = setTimeout(() => {
      if (indexScroll === 0) {
        current.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
      } else {
        current.scrollBy({
          top: productDivs[indexScroll - 1].clientHeight + 10,
          left: 0,
          behavior: 'smooth'
        })
      }

      setIndexScroll(
        indexScroll === productDivs.length - 1 ? 0 : indexScroll + 1
      )
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [indexScroll, infinite, delay, isMouseOver, loading])

  useEffect(() => {
    if (!productLisRef.current) return
    productLisRef.current.addEventListener('mouseover', () => {
      setIsMouseOver(true)
    })
    productLisRef.current.addEventListener('mouseout', () => {
      setIsMouseOver(false)
    })

    return () => {}
  }, [productLisRef])

  return (
    <div className={styles.verticalProductSliderContent}>
      <div className={styles.verticalProductSliderTitle}>
        <h1 className={styles.title}>Productos</h1>
      </div>
      <div className={styles.productList} ref={productLisRef} id='product-list'>
        {!loading &&
          products.length > 0 &&
          products.map((product: any) => (
            <ProductItem key={product.id} {...product} />
          ))}
      </div>
    </div>
  )
}
