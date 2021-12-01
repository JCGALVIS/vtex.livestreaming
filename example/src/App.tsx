import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='leidygiraldo'
      idLivestreaming='86f316cb-b6d0-4879-b87d-48ad649c670c'
      isInGlobalPage={false}
      isInfinite={false}
      kuikpay={false}
      originOfProducts='CACE'
      redirectTo={true}
      showChat={true}
      showLike={true}
      showProductsCarouse={false}
      showSidebarProducts={true}
      showViewers={true}
      time={10}
    />
  )
}

export default App
