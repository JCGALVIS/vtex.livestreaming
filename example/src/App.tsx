import React from 'react'

import { LivestreamingVideo, Chat } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'

import './app.css'

const App = () => {
  return (
    <div className='appContent'>
      <div className='videoContent'>
        <LivestreamingVideo streamUrl='https://a8a9a64b061c.us-east-1.playback.live-video.net/api/video/v1/us-east-1.356389886440.channel.vRR9XH3krJqD.m3u8' />
      </div>
      <div className='chatContent'>
        <Chat title='Chat' placeholder='Ingrese un mensaje' />
      </div>
    </div>
  )
}

export default App
