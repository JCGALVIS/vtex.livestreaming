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
      idLivestreaming='d6b21df0-e407-404a-a899-2ffc537c9ded'
      account='livestreamingdemo'
      inactiveSidebarProducts='true'
      inactiveProductsCarousel='false'
      inactivateChat='true'
      inactivateLike='true'
      inactivateViewers='true'
      isInfinite='_ISINFINITE'
      time='_TIME'
      pdp='true'
      originOfProducts='_ORIGINOFPRODUCTS'
      kuikpay='_KUIKPAY'
    />
  )
}

export default App
