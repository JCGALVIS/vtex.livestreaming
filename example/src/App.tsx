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
      idLivestreaming='2127059c-4752-4e55-9720-1ed813e625ba'
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
      kuikpay="true"
    />
  )
}

export default App
