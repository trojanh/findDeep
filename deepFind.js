function deepFind(objectToSearch, searchKey) {
  if(typeof objectToSearch !== 'object') return null
  if(objectToSearch[searchKey]) return objectToSearch[searchKey]
  // works for arrays and objects
  for (const iterator of Object.values(objectToSearch)) {
    const result = deepFind(iterator, searchKey)
    if(result !== null) return result
  }
  return null
}

module.exports = deepFind
