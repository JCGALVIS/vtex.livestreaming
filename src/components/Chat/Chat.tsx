import React, { useRef, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Input } from 'vtex.styleguide'

import { useCssHandles } from 'vtex.css-handles'
import { Message } from './../../typings/livestreaming'

import MessageLivestreamingIcon from '../icons/MessageLivestreamingIcon'
import ArrorRightLivestreaming from '../icons/ArrorRightLivestreaming'

import './styles.css'

const CSS_HANDLES = [
  'container',
  'subContainer',
  'lifeChatContainer',
  'lifeChatText',
  'chatArea',
  'chatBubble',
  'chatTime',
  'chatText',
  'chatUser',
  'chatTextContainer',
  'inputChat',
  'shippingTermsSocialNetworks',
  'profileIcon',
  'chatMessage'
]

export const Chat = () => {
  const handles = useCssHandles(CSS_HANDLES)
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const [content, setContent] = useState<string>('')
  const intl = useIntl()

  return (
    <div className={handles.container}>
      <div className={handles.lifeChatContainer}>
        <p className={handles.lifeChatText}>
          <FormattedMessage id='store/live.chat' />
        </p>
        <MessageLivestreamingIcon size='40' viewBox='0 0 400 400' />
      </div>
      <div className={handles.subContainer}>
        <div className={handles.chatArea} ref={chatAreaRef}>
          {/* {ChatMessages} */}
        </div>
        <form className={handles.inputChat}>
          <Input
            placeholder={intl?.formatMessage({
              id: 'store/text.chat-placeholder'
            })}
            name='content'
            resize='none'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setContent(e.target.value)
            }
            value={content}
            autoComplete='off'
          />
          <Button type='submit' variation='primary'>
            <ArrorRightLivestreaming size='40' viewBox='0 0 400 400' />
          </Button>
        </form>
      </div>
    </div>
  )
}
