export const getCorrectUrlToShare = (
  account: string,
  idLivestreaming: string,
  isInGlobalPage: boolean
) => {
  const { origin, pathname, href, search } = window.location
  let url = ''

  if (isInGlobalPage) {
    let livePath = ''
    if (href.indexOf(account) == -1) {
      livePath =
        href[href.length - 1] == '/'
          ? `${account}/${idLivestreaming}`
          : `/${account}/${idLivestreaming}`
    } else {
      livePath =
        href[href.length - 1] == '/'
          ? `${idLivestreaming}`
          : `/${idLivestreaming}`
    }
    const isLivePathAtEnd =
      href.indexOf(livePath) == href.length - livePath.length
    url = isLivePathAtEnd ? href : href + livePath
  } else if (search && !isInGlobalPage) {
    url = origin + pathname + search
  } else {
    url = origin + pathname
  }

  return url
}
