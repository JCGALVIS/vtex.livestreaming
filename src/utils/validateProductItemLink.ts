const validateLink = (link: string) => {
  const hasWwwSubDomain = (link: string) => {
    if (link.indexOf('www') >= 0 || link.indexOf('WWW') >= 0) {
      return true
    } else {
      return false
    }
  }
  if (hasWwwSubDomain(link)) {
    return link
  } else {
    const urlScheme = link.indexOf('https://') >= 0 ? 'https://' : 'http://'
    const wwwSubDomain = 'www.'
    const validatedLink =
      link.slice(0, urlScheme.length) +
      wwwSubDomain +
      link.slice(urlScheme.length)
    return validatedLink
  }
}

export { validateLink }
