import React from 'react'

import { LivestreamingVideo, Chat } from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'

const App = () => {
  return (
    <div>
      <div>
        <LivestreamingVideo streamUrl='https://a8a9a64b061c.us-east-1.playback.live-video.net/api/video/v1/us-east-1.356389886440.channel.vRR9XH3krJqD.m3u8' />
      </div>
      <div>
        <Chat title='Chat' placeholder='Ingrese un mensaje' />
      </div>
    </div>
  )
}

export default App
