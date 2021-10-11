import React, { useEffect } from 'react'

import styles from './variationSelector.css'

type SizeVariationsProps = {
  sizeData: { id: string; name: string; position: number }[]
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>
  selectedSize: string
}

export const SizeVariations = ({
  sizeData,
  setSelectedSize,
  selectedSize
}: SizeVariationsProps) => {
  useEffect(() => {
    setSelectedSize(sizeData[0].name)
  }, [sizeData])

  const handleSizeSelect = (sizeId: string, sizeName: string) => {
    setSelectedSize(sizeName)
    const divSelect = document.getElementById(sizeId)
    const divSelects = document.querySelectorAll('.divSelectColor')

    divSelects.forEach((item) => {
      item.removeAttribute('style')
      item.setAttribute('style', 'display: none')
    })

    if (divSelect) divSelect.style.display = 'initial'
  }

  return (
    <div className={styles.itemContent}>
      {sizeData.map((size) => (
        <div key={size.id} className={styles.itemSize}>
          <div
            id={size.id}
            className={`${styles.itemSizeSelect} divSelectColor`}
            style={
              selectedSize === size.name
                ? { display: 'initial' }
                : { display: 'none' }
            }
          />
          <div
            className={styles.itemSizeBackground}
            onClick={() => handleSizeSelect(size.id, size.name)}
          >
            <span>{size.name}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
