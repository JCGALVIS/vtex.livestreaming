import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='leidygiraldo'
      idLivestreaming='99d9930f-91c2-4060-8cea-f1ab4ffab682'
      isInGlobalPage={false}
      isInfinite={false}
      kuikpay={false}
      originOfProducts='CACE'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showProductsCarousel={false}
      showSidebarProducts={true}
      showViewers={true}
      time={10}
    />
  )
}

export default App
