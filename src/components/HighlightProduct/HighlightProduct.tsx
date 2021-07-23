import React from 'react'
import { IconClose } from 'vtex.styleguide'

const HighlightProduct = ({ ProductSummary }) => {
  return (
    <div>
      <div className='highlightProductContainer' id='highlightProductContainer'>
        <button className='closeCardBtn'>
          <IconClose />
        </button>
      </div>
    </div>
  )
}

export default HighlightProduct
