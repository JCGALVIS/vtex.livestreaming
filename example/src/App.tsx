import React from 'react'

import { Livestreaming } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const App = () => {
  return (
    <Livestreaming
      idLivestreaming='dd153f50-127e-42cf-b42e-dba640d5e940'
      account='livestreamingdemo'
    />
  )
}

export default App
