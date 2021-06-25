import React from 'react'

import {
  LivestreamingVideo,
  Chat,
  Like,
  useWebSocket
} from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'

const App = () => {
  const info = useWebSocket()

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '100%', position: 'relative' }}>
        <div>
          <LivestreamingVideo streamUrl='https://a8a9a64b061c.us-east-1.playback.live-video.net/api/video/v1/us-east-1.356389886440.channel.GVPs21lx36wR.m3u8' />
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            right: 21,
            zIndex: 10
          }}
        >
          <Like infoLivestreaming={info} />
        </div>
      </div>

      <div>
        <Chat
          title='Chat'
          placeholder='Ingrese un mensaje'
          infoLivestreaming={info}
        />
      </div>
    </div>
  )
}

export default App
