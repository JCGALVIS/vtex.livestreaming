import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {

  return (
    <Livestreaming
      idLivestreaming='246be8b0-49f2-4bd1-8cdf-89f9b1a552d1'
      account='livestreamingdemo'
    />
  )
}

export default App
