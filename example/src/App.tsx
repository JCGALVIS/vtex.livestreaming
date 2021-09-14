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
      idLivestreaming='76e21788-1ff4-49dd-883a-20ca90d94e79'
      account='livestreamingdemo'
      inactiveSidebarProducts='true'
      inactiveProductsCarousel='true'
      inactivateChat='true'
      inactivateLike='true'
      inactivateViewers='true'
      isInfinite='true'
      time='10'
      pdp='true'
      originOfProducts='platform'
    />
  )
}

export default App
