import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='livestreamingdemo'
      idLivestreaming='e036640e-daa4-4017-9046-521dd1bca7c4'
      isInGlobalPage='_ISINGLOBALPAGE'
      isInfinite={false}
      kuikpay={false}
      originOfProducts='CACE'
      redirectTo={false}
      showChat={true}
      showLike={true}
      showQuickView={true}
      showProductsCarousel='_INACTIVEPRODUCTSCAROUSEL'
      showSidebarProducts={true}
      showViewers={true}
      time='_TIME'
    />
  )
}

export default App
