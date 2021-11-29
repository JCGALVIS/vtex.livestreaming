/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { LOCALES, I18nProvider } from './i18n'
import { ActionsProvider } from './context/ActionsContext'
import { SettingProvider } from './context/SettingContext'
import { LiveShopping } from './components/LiveShopping'
import type { LivestreamingProps } from './typings/livestreaming'
import { useLivestreamingConfig } from './hooks'
import { Spinner } from './components'

export const Livestreaming = (props: LivestreamingProps) => {
  const { idLivestreaming, account } = props
  const [locale, setLocale] = useState(LOCALES.en)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const languageBrowser = window.navigator.language.trim().split(/-|_/)[0]
    const languageAvailable = [LOCALES.en, LOCALES.es, LOCALES.pt]

    setLocale(
      languageAvailable.includes(languageBrowser) ? languageBrowser : LOCALES.en
    )
  }, [])

  const { isModalLive, setIsModalLive } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const settingProps = { isModalLive, setIsModalLive }

  useEffect(() => {
    setTimeout(() => setLoading(false))
  }, [])

  return (
    <I18nProvider locale={locale}>
      <ActionsProvider props={props}>
        <SettingProvider {...settingProps}>
          {loading && <Spinner />}
          {!loading && <LiveShopping setLoading={setLoading} />}
        </SettingProvider>
      </ActionsProvider>
    </I18nProvider>
  )
}
