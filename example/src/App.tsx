import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
    account='livestreamingdemo'
    idLivestreaming='84e7e0c3-3bf4-4b64-9a97-f76715d3ae8e'
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
