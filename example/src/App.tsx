import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='f0f2658b-854e-427d-83d6-eb8259367d81'
      account='livestreamingdemo'
      inactiveSidebarProducts='true'
      inactiveProductsCarousel='true'
      inactivateChat='true'
      inactivateLike='true'
      inactivateViewers='true'
      isInfinite='true'
      time='true'
    />
  )
}

export default App
