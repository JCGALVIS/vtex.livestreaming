import React /*, { useState, useEffect } */ from 'react'

import LikeNew from './LikeButton/Like'
// import styles from './index.css'

const Like = () => {
  // const [transmiting, setTransmiting] = useState(false)

  /* useEffect(() => {
    const ivsRealTime = livestreaming?.ivsRealTime

    if (ivsRealTime) {
      setTransmiting(ivsRealTime.status === 'LIVE')
    }
  }, [livestreaming?.ivsRealTime])

  if (!transmiting) return null
*/
  return (
    <div
      style={{
        zIndex: 1000,
        color: 'black'
      }}
    >
      LIKE
      <LikeNew />
    </div>
  )
}

export default Like
