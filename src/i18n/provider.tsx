import type { ReactNode } from 'react'
import React, { Fragment } from 'react'

import { IntlProvider } from 'react-intl'

import { LOCALES } from './locales'
import messages from './messages'

interface Props {
  children: ReactNode
  locale: string
}

const Provider = ({ children, locale = LOCALES.en }: Props) => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
)

export default Provider
