export const getCorrectUrlToShare = (
  account: string,
  idLivestreaming: string,
  isInGlobalPage: boolean
) => {
  let url = ''
  let livePath = ''
  const { origin, pathname, href, search } = window.location
  const slash = href[href.length - 1] === '/' ? '' : '/'
  const hasAccount = href.indexOf(account) >= 0 || href.indexOf('account') >= 0
  const hasIdLive = href.indexOf(idLivestreaming) >= 0
  if (isInGlobalPage) {
    if (hasAccount && hasIdLive) {
      livePath = ''
    } else if (hasAccount && !hasIdLive) {
      livePath = `${slash}${idLivestreaming}`
    } else if (!hasAccount) {
      livePath = `${slash}account/${idLivestreaming}`
    }
    const isLivePathAtEnd =
      href.indexOf(livePath) === href.length - livePath.length
    url = isLivePathAtEnd ? href : href + livePath + search
  } else {
    url = origin + pathname
  }
  return url
}
