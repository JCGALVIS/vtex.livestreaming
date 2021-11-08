/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import type { Values, VariationSelector } from '../../typings/livestreaming'

import styles from './variationSelector.css'

type ColorVariationProps = {
  variations: VariationSelector[]
  setSelectedColor: React.Dispatch<React.SetStateAction<Values[]>>
}

const coloredItems = {
  negro: '#000000',
  rosa: '#ffc0cb',
  blanco: '#ffffff',
  amarillo: '#ffff00',
  azul: '#134cd8',
  verde: '#008000',
  gris: '#808080',
  cafe: '#8d4925',
  plateado: '#b6b3b9',
  'gris oscuro': '#3d3c41',
  rosado: '#ffc0cb',
  'azul marino': '#4a5d7d',
  lavanda: '#d5b9da',
  rojo: '#ce0301',
  bronce: '#a98078',
  dorado: '#b6a59d',
  marrón: '#6c6362',
  beige: '#e7d7bd',
  violeta: '#2a0e4b'
}

export const ColorVariation = ({
  variations,
  setSelectedColor
}: ColorVariationProps) => {
  const [colorArray, setColorArray] = useState<VariationSelector[]>([])

  useEffect(() => {
    if (variations.length <= 0) return
    const color = variations?.filter(
      (item) => item.field.name.indexOf('Color') === 0
    )

    if (color) setColorArray(color)

    const colorFormatted = color.map((color) => {
      return {
        id: color.values[0].id,
        name: color.values[0].name,
        variationId: color.field.id,
        variationName: color.field.name
      }
    })

    setSelectedColor(colorFormatted)
  }, [variations])

  const handleColorSelect = (
    colorId: string,
    value: Values,
    variation: number,
    variationName: string
  ) => {
    value.variationId = variation
    value.variationName = variationName

    if (value) setSelectedColor([value])

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
      {colorArray.length > 0 &&
        colorArray[0].values.map((color, index) => (
          <div key={color.id} className={styles.itemColor}>
            <div
              id={color.id}
              className={`${styles.itemColorSelect} divSelectSize`}
              style={index === 0 ? { display: 'initial' } : { display: 'none' }}
            />
            <div
              style={{
                backgroundColor: coloredItems[color.name.toLowerCase()]
              }}
              className={styles.itemColorBackground}
              onClick={() =>
                handleColorSelect(
                  color.id,
                  color,
                  colorArray[0].field.id,
                  colorArray[0].field.name
                )
              }
            />
          </div>
        ))}
    </div>
  )
}
