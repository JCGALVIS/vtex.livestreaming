/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { LOCALES, I18nProvider } from './i18n'
import { ActionsProvider } from './context/ActionsContext'
import { SettingProvider } from './context/SettingContext'
import { LiveShopping } from './components/LiveShopping'
import type { LivestreamingProps } from './typings/livestreaming'
import { useLivestreamingConfig } from './hooks'

export const Livestreaming = (props: LivestreamingProps) => {
  const { idLivestreaming, account } = props
  const [locale, setLocale] = useState(LOCALES.en)

  useEffect(() => {
    setLocale((window.navigator.language || LOCALES.en).trim().split(/-|_/)[0])
  }, [])

  const { isModalLive, setIsModalLive } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const settingProps = { isModalLive, setIsModalLive }

  return (
    <I18nProvider locale={locale}>
      <ActionsProvider props={props}>
        <SettingProvider {...settingProps}>
          <LiveShopping {...props} />
        </SettingProvider>
      </ActionsProvider>
    </I18nProvider>
  )
}
