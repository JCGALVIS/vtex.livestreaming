import React from 'react'

import {
  LivestreamingVideo,
  Chat,
  Like,
  Viewers,
  Live,
  useWebSocket,
  useLivestreamingConfig
} from 'vtex.livestreaming'
import 'vtex.livestreaming/dist/index.css'
import './app.css'

const LIVESTREAMING_ID = '0a0ef145-60e5-4e3c-837a-7c9ce2004e46'
const ACCOUNT = 'livestreamingdemo'

const App = () => {
  const { wssStream, streamUrl } = useLivestreamingConfig({
    id: LIVESTREAMING_ID,
    account: ACCOUNT
  })
  const infoSocket = useWebSocket({ wssStream })

  return (
    <div className='appContent'>
      <div className='videoContainer'>
        <div className='videoContent'>
          <LivestreamingVideo infoSocket={infoSocket} streamUrl={streamUrl} />
        </div>
        <div className='likeContent'>
          <Like infoSocket={infoSocket} />
        </div>
        <div className='viewersContent'>
          <Viewers infoSocket={infoSocket} />
        </div>
        <div className='liveContent'>
          <Live infoSocket={infoSocket} />
        </div>
        <div className='chatContent'>
          <Chat
            title='Chat'
            placeholder='Ingrese un mensaje'
            infoSocket={infoSocket}
            idLivestreaming={LIVESTREAMING_ID}
            account={ACCOUNT}
          />
        </div>
      </div>
    </div>
  )
}

export default App
