import React from 'react'
import type { IGif } from '@giphy/js-types'
import ReactGiphySearchbox from 'react-giphy-searchbox'
import styles from './Giphy.css'

interface Props {
  showGif: boolean
  sendGif: (
    event: React.SyntheticEvent | undefined,
    type: string,
    gif?: string
  ) => void
}

const GiphySearch = (props: Props) => {
  const { sendGif, showGif } = props
  /**
  wrapperClassName	string	Additional CSS class for the <div> that wrap the whole component.
  searchFormClassName	string	Additional CSS class for the <form> element.
  listWrapperClassName	string	Additional CSS class for the <div> that wrap the GIFs list.
  listItemClassName	string	Additional CSS class for the <button> that wrap the single image.
  */

  return (
    <div
      className={styles.giphySearchBoxContainer}
      style={{ display: showGif ? 'flex' : 'none' }}
    >
      <ReactGiphySearchbox
        wrapperClassName={styles.giphySearchBoxWrapper}
        searchFormClassName={styles.giphySearchBoxSearchForm}
        listWrapperClassName={styles.giphySearchBoxlistWrapper}
        listItemClassName={styles.giphySearchBoxlistItem}
        apiKey='8uW5K9OTZrXxxZd65rncfQ3e8owkueU1' // Required: get your on https://developers.giphy.com
        onSelect={(item: IGif) => {
          sendGif(
            undefined,
            'gif',
            `${item.images.fixed_height_small.url},${item.images.fixed_width_small.url}`
          )
        }}
      />
    </div>
  )
}

export default GiphySearch
