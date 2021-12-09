import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='leidygiraldo'
      idLivestreaming='34d6bda3-0c9a-4cf3-925e-846304b99696'
      isInGlobalPage={false}
      isInfinite={false}
      kuikpay='_KUIKPAY'
      originOfProducts='CACE'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showProductsCarousel={true}
      showSidebarProducts={true}
      showViewers={true}
      time='_TIME'
    />
  )
}

export default App
