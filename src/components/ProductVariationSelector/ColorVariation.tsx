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

  return (
    <div className={styles.itemContent}>
      {colorArray.map((color) => (
        <div key={color.id} className={styles.itemColor}>
          <div className={styles.itemColorSelect} />
          <div
            style={{ backgroundColor: color.name }}
            className={styles.itemColorBackground}
          />
        </div>
      ))}
    </div>
  )
}
