import React from 'react'

import styles from './variationSelector.css'

type SizeVariationsProps = {
  sizeData: { id: string; name: string; position: number }[]
}

export const SizeVariations = ({ sizeData }: SizeVariationsProps) => {
  console.log('sizeData: ', sizeData)

  return (
    <div className={styles.itemContent}>
      {sizeData.map((size) => (
        <div key={size.id} className={styles.itemSize}>
          <div className={styles.itemSizeSelect} />
          <div>
            <span>{size.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
