export const getCorrectUrlToShare = (
  account: string,
  idLivestreaming: string,
  isInGlobalPage: boolean
) => {
  let url = ''
  let livePath = ''
  const { href, pathname } = window.location
  const slash = href[href.length - 1] === '/' ? '' : '/'
  const hasAccount = href.indexOf(account) >= 0 || href.indexOf('account') >= 0
  const hasIdLive = href.indexOf(idLivestreaming) >= 0
  const isPreview = href.indexOf('preview') >= 0
  if (isInGlobalPage) {
    if (hasAccount && hasIdLive) {
      livePath = ''
    } else if (hasAccount && !hasIdLive) {
      livePath = `${slash}${idLivestreaming}`
    } else if (!hasAccount) {
      livePath = `${slash}account/${idLivestreaming}`
    }
    url = href + livePath
  } else if (isPreview) {
    url = href
  } else {
    url = origin + pathname
  }
  return url
}
