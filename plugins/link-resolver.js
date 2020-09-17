/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc) {
  console.log('Link resolver:', doc.type+':'+doc.uid)
  if (doc.isBroken) {
    return '/not-found'
  }
  if (doc.type === 'homepage') {
    return '/'
  }
  if (doc.type === 'building') {
    return '/building/' + doc.uid
  }
  if (doc.uid === 'findyourhome') {
    return '/findahome'
  }
  if (doc.uid === 'blog') {
    return '/blog'
  }
  if (doc.type === 'blogpage') {
    return '/blog/' + doc.uid
  }
  if (doc.type === 'page') {
    if (doc.uid === "findahome") {
      return doc.uid
    } else {
      return '/page/' + doc.uid
    }
  }
  if (doc.type === 'city') {
    return '/city/' + doc.uid
  }
  return '/not-found'
}
