import React from 'react'
import IconCopy from '@vtex/styleguide/lib/icon/Copy'
import IconClose from '@vtex/styleguide/lib/icon/Close'
import { FacebookIcon, TwitterIcon, WhatsappIcon } from '../icons'
import copyTextToClipboard from '../../utils/copy'
import { useLivestreamingContext } from '../../context'
import { getUrlToShareLivestreaming } from '../../utils'
import styles from './style.css'

const ShareComponents = ({ handleClose }: { handleClose: () => void }) => {
  const { account, idLivestreaming } = useLivestreamingContext()
  const url = getUrlToShareLivestreaming(account, idLivestreaming)

  const urlshareSocial = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}`,
    whatsapp: `https://api.whatsapp.com/send?text=${url}`
  }
  const shareeOnclik = (social: 'facebook' | 'twitter' | 'whatsapp') => {
    window.open(
      urlshareSocial[social],
      '',
      'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600'
    )
  }

  return (
    <div className={`${styles.containerShare}`}>
      <button className={`${styles.closeShare}`} onClick={() => handleClose()}>
        <IconClose />
      </button>
      <div className={`${styles.containerFlexShare}`}>
        <div className={`${styles.textShare}`}>Compartir</div>
        <div className={`${styles.containerShareIcon}`}>
          <div onClick={() => shareeOnclik('facebook')}>
            <FacebookIcon size='32' viewBox='0 0 64 64' />
          </div>
          <div onClick={() => shareeOnclik('twitter')}>
            <TwitterIcon size='32' viewBox='0 0 64 64' />
          </div>
          <div onClick={() => shareeOnclik('whatsapp')}>
            <WhatsappIcon size='32' viewBox='0 0 64 64' />
          </div>
        </div>
      </div>
      <div className={`${styles.containerCopy}`}>
        <input className={`${styles.inputShare}`} disabled value={url} />
        <button
          className={`${styles.buttonCopyShare}`}
          onClick={() => copyTextToClipboard(url)}
        >
          <div style={{ cursor: 'pointer' }}>
            <IconCopy />
          </div>
        </button>
      </div>
    </div>
  )
}

export default ShareComponents
