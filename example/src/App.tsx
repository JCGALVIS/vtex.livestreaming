import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {

  return (
    <Livestreaming
      idLivestreaming='95fcbdbe-f03a-4e19-82c8-e7fafa242cd7'
      account='livestreamingdemo'
    />
  )
}

export default App
