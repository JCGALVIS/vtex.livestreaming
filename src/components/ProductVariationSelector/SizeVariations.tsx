/* eslint-disable no-unused-vars */
import React, { useEffect, useState, Fragment } from 'react'
import type { Values, VariationSelector } from '../../typings/livestreaming'

import styles from './variationSelector.css'

type SizeVariationsProps = {
  variations: VariationSelector[]
  setSelectedSize: React.Dispatch<React.SetStateAction<Values[]>>
  selectedSize: Values[]
}

export const SizeVariations = ({
  variations,
  setSelectedSize,
  selectedSize
}: SizeVariationsProps) => {
  const [filteredVariation, setFilteredVariation] = useState<
    VariationSelector[]
  >([])

  useEffect(() => {
    if (variations.length <= 0) return
    const otherVariations = variations?.filter(
      (item) => item.field.name.indexOf('Color') !== 0
    )

    if (otherVariations) setFilteredVariation(otherVariations)

    const selectVariation = otherVariations.map((variation) => {
      return {
        id: variation.values[0].id,
        name: variation.values[0].name,
        variationId: variation.field.id,
        variationName: variation.field.name
      }
    })

    if (selectedSize.length === 0) setSelectedSize(selectVariation)
  }, [variations])

  const handleSizeSelect = (
    sizeId: string,
    value: Values,
    variation: number,
    variationName: string
  ) => {
    const selectItem = selectedSize.filter(
      (select) => select.variationId !== variation
    )
    value.variationId = variation
    value.variationName = variationName

    selectItem.push(value)
    setSelectedSize(selectItem)

    const divSelect = document.getElementById(sizeId)
    const divSelects = document.querySelectorAll(`.divSelectColor-${variation}`)

    divSelects.forEach((item: HTMLElement) => {
      if (item.style.display === 'initial') {
        item.removeAttribute('style')
        item.setAttribute('style', 'display: none')
      }
    })

    if (divSelect) divSelect.style.display = 'initial'
  }

  return (
    <div className={styles.variationContent}>
      {filteredVariation?.length > 0 &&
        filteredVariation.map((variation) => (
          <Fragment key={variation.field.id}>
            <h2 className={styles.titleVariation}>{variation.field.name}:</h2>
            <div className={styles.itemContent}>
              {variation.values.map((value) => (
                <div key={value.id} className={styles.itemSize}>
                  <div
                    id={value.id}
                    className={`${styles.itemSizeSelect} divSelectColor-${variation.field.id}`}
                    style={
                      selectedSize.length > 0
                        ? selectedSize.find(
                            (select) => select.name === value.name
                          )
                          ? { display: 'initial' }
                          : { display: 'none' }
                        : { display: 'none' }
                    }
                  />
                  <div
                    className={styles.itemSizeBackground}
                    onClick={() =>
                      handleSizeSelect(
                        value.id,
                        value,
                        variation.field.id,
                        variation.field.name
                      )
                    }
                  >
                    <span>{value.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </Fragment>
        ))}
    </div>
  )
}
