/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import { LOCALES, I18nProvider } from './i18n'
import { LiveShopping } from './components/LiveShopping'
import type { LivestreamingProps } from './typings/livestreaming'
import { useLivestreamingConfig } from './hooks'
import { Spinner } from './components'
import {
  ActionsProvider,
  SettingProvider,
  useLivestreamingReducer,
  useSetLivestreaming,
  useSetInfoFinalizedEvents,
  LivestreamingProvider
} from './context'

import styles from './styles.module.css'

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

  const {
    collectionId,
    isModalLive,
    setIsModalLive,
    wssStream,
    host,
    playBackStartTime
  } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  const settingProps = {
    collectionId,
    isModalLive,
    setIsModalLive,
    wssStream
  }

  const [state, dispatch] = useLivestreamingReducer()
  useSetLivestreaming(
    idLivestreaming,
    account,
    host,
    playBackStartTime,
    dispatch
  )
  useSetInfoFinalizedEvents(idLivestreaming, account, dispatch)

  useEffect(() => {
    const { isInGlobalPage } = props
    if (typeof isInGlobalPage === 'boolean' && isInGlobalPage)
      setIsModalLive(false)
    const timeout = setTimeout(() => setLoading(false), 3000)

    return () => {
      clearTimeout(timeout)
    }
  }, [isModalLive])

  return (
    <I18nProvider locale={locale}>
      <ActionsProvider props={props}>
        <SettingProvider {...settingProps}>
          <LivestreamingProvider value={state} dispatch={dispatch}>
            <div className={styles.liveShoppingContainer}>
              {loading && <Spinner />}
              {!loading && <LiveShopping setLoading={setLoading} />}
            </div>
          </LivestreamingProvider>
        </SettingProvider>
      </ActionsProvider>
    </I18nProvider>
  )
}
