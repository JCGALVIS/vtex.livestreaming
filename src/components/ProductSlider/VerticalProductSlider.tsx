import React from 'react'

import { ProductItem } from './ProductItem'
import { useFetchProducts } from './../../hooks/useFetchProducts'

import styles from './productSlider.css'

type VerticalProductSliderProps = {
  collectionId: string | undefined
}

export const VerticalProductSlider = ({
  collectionId
}: VerticalProductSliderProps) => {
  const { data: products, loading } = useFetchProducts({ collectionId })

  return (
    <div className={styles.verticalProductSliderContent}>
      <div className={styles.verticalProductSliderTitle}>
        <h1 className={styles.title}>Productos</h1>
      </div>
      <div className={styles.productList}>
        {!loading &&
          products.length > 0 &&
          products.map((product: any) => (
            <ProductItem key={product.id} {...product} />
          ))}
      </div>
    </div>
  )
}
