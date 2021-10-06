import React, { useEffect, useState } from 'react'

import styles from './variationSelector.css'

type ColorVariationProps = {
  colorData: { id: string; name: string; position: number }[]
}

const coloredItems = {
  negro: '#000000',
  rosa: '#ffc0cb',
  blanco: '#ffffff',
  amarrillo: '#ffff00',
  azul: '#134cd8',
  verde: '#008000',
  girs: '#808080',
  cafe: '#8d4925'
}

export const ColorVariation = ({ colorData }: ColorVariationProps) => {
  const [colorArray, setColorArray] = useState([{ id: '', name: '' }])

  useEffect(() => {
    const color = colorData.map((color) => {
      return {
        id: color.id,
        name: coloredItems[color.name.toLowerCase()]
      }
    })

    if (color) setColorArray(color)

    console.log('color: ', color)
  }, [colorData])

  const handleColorSelect = (colorId: string) => {
    const divSelect = document.getElementById(colorId)
    const divSelects = document.querySelectorAll('.divSelectSize')

    console.log('divSelects: ', divSelects)

    if (divSelect) divSelect.style.display = 'initial'
  }

  return (
    <div className={styles.itemContent}>
      {colorArray.map((color) => (
        <div key={color.id} className={styles.itemColor}>
          <div
            id={color.id}
            className={`${styles.itemColorSelect} divSelectSize`}
            style={{ display: 'none' }}
          />
          <div
            style={{ backgroundColor: color.name }}
            className={styles.itemColorBackground}
            onClick={() => handleColorSelect(color.id)}
          />
        </div>
      ))}
    </div>
  )
}
