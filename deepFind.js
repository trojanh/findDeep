
function deepFind(objectToSearch, searchKey) {
  if(typeof objectToSearch !== 'object') return null
  if(objectToSearch[searchKey]) return objectToSearch[searchKey]
  if(Array.isArray(objectToSearch)) {
    for (const iterator of objectToSearch) {
      const result = deepFind(iterator, searchKey)
      if(result !== null) return result
    }
  }
  for (const objectKey in objectToSearch) {
    const result = deepFind(objectToSearch[objectKey], searchKey)
    if(result !== null) return result
  }
  return null
}

module.exports = deepFind
