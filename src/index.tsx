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
  const [actionsProps, setActionsProps] = useState(props)

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
    playBackStartTime,
    settings,
    isLoading
  } = useLivestreamingConfig({
    id: idLivestreaming,
    account
  })

  console.log('settings: ', settings)

  const settingProps = {
    collectionId,
    isModalLive,
    setIsModalLive,
    wssStream
  }

  useEffect(() => {
    if (!settings || isLoading === undefined || isLoading) return
    setActionsProps({
      ...actionsProps,
      showChat:
        settings.showChat === undefined
          ? actionsProps.showChat
          : settings.showChat,
      showLike:
        settings.showLike === undefined
          ? actionsProps.showLike
          : settings.showLike,
      showProductsCarousel:
        settings.showProductsCarousel === undefined
          ? actionsProps.showProductsCarousel
          : settings.showProductsCarousel,
      showSidebarProducts:
        settings.showSidebarProducts === undefined
          ? actionsProps.showSidebarProducts
          : settings.showSidebarProducts,
      isInfinite:
        settings.isInfinite === undefined
          ? actionsProps.isInfinite
          : settings.isInfinite,
      time: settings.time === undefined ? actionsProps.time : settings.time,
      isLoading
    })
  }, [settings, isLoading])

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
      <ActionsProvider props={actionsProps}>
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
