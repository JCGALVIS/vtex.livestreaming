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
      idLivestreaming='00c12694-9453-4594-8cc4-d120fc1a85d9'
      account='leidygiraldo'
      inactiveSidebarProducts='true'
      inactiveProductsCarousel='false'
      inactivateChat='true'
      inactivateLike='true'
      inactivateViewers='true'
      isInfinite='_ISINFINITE'
      time='_TIME'
      pdp='_PDP'
      originOfProducts='CACE'
      kuikpay='_KUIKPAY'
    />
  )
}

export default App
