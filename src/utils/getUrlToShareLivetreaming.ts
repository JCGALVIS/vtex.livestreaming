export const getUrlToShareLivestreaming = (
  account: string,
  idLivestreaming: string
) => {
  const { href } = window.location

  const livePath =
    href[href.length - 1] == '/'
      ? `${account}/${idLivestreaming}`
      : `/${account}/${idLivestreaming}`

  const isLivePathAtEnd =
    href.indexOf(livePath) == href.length - livePath.length

  const url = isLivePathAtEnd ? href : href + livePath

  return url
}
