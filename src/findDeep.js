function findDeep(objectToSearch, searchKey) {
  if (typeof objectToSearch !== 'object') return null
  const foundValues = []
  if (objectToSearch[searchKey]) foundValues.push(objectToSearch[searchKey])

  // works for arrays and objects
  for (const iterator of Object.values(objectToSearch)) {
    const result = findDeep(iterator, searchKey)
    if (result !== null) foundValues.push(...result)
  }
  return foundValues
}

module.exports = findDeep
