import React, { useEffect, useState } from 'react'

import styles from './variationSelector.css'

type ColorVariationProps = {
  colorData: { id: string; name: string; position: number }[]
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>
}

const coloredItems = {
  negro: '#000000',
  rosa: '#ffc0cb',
  blanco: '#ffffff',
  amarillo: '#ffff00',
  azul: '#134cd8',
  verde: '#008000',
  girs: '#808080',
  café: '#8d4925'
}

export const ColorVariation = ({
  colorData,
  setSelectedColor
}: ColorVariationProps) => {
  const [colorArray, setColorArray] = useState([{ id: '', name: '', text: '' }])

  useEffect(() => {
    setSelectedColor(colorData[0].name)
    const color = colorData.map((color) => {
      return {
        id: color.id,
        name: coloredItems[color.name.toLowerCase()],
        text: color.name
      }
    })

    if (color) setColorArray(color)
  }, [colorData])

  const handleColorSelect = (colorId: string, colorName: string) => {
    setSelectedColor(colorName)
    const divSelect = document.getElementById(colorId)
    const divSelects = document.querySelectorAll('.divSelectSize')

    divSelects.forEach((item) => {
      item.removeAttribute('style')
      item.setAttribute('style', 'display: none')
    })

    if (divSelect) divSelect.style.display = 'initial'
  }

  return (
    <div className={styles.itemContent}>
      {colorArray.map((color, index) => (
        <div key={color.id} className={styles.itemColor}>
          <div
            id={color.id}
            className={`${styles.itemColorSelect} divSelectSize`}
            style={index === 0 ? { display: 'initial' } : { display: 'none' }}
          />
          <div
            style={{ backgroundColor: color.name }}
            className={styles.itemColorBackground}
            onClick={() => handleColorSelect(color.id, color.text)}
          />
        </div>
      ))}
    </div>
  )
}
