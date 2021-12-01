import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      account='livestreamingdemo'
      idLivestreaming='f283f156-050e-41bc-9a27-46fcd917f0cc'
      isInGlobalPage={true}
      isInfinite={false}
      kuikpay={false}
      originOfProducts='CACE'
      redirectTo={false}
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
