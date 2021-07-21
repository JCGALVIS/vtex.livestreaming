import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='ed965935-b267-465c-8f58-5be31b69577c'
      account='livestreamingdemo'
    />
  )
}

export default App
