import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='c2a7a532-8ab6-4585-9051-21a549beacc4'
      account='livestreamingdemo'
    />
  )
}

export default App
