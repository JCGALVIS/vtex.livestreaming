import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  document.addEventListener('addToCartPortal', () => {
    alert('Add to cart...')
  })

  return (
    <Livestreaming
      idLivestreaming='138ec556-456b-4989-ba8a-061b772145d1'
      account='livestreamingdemo'
      inactiveSidebarProducts="true"
      inactiveProductsCarousel="true"
      inactivateChat="true"
      inactivateLike="true"
      inactivateViewers="true"
      isInfinite="false"
      time='_TIME'
      pdp="true"
      originOfProducts='_ORIGINOFPRODUCTS'
    />
  )
}

export default App
