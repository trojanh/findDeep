// @ts-check
'use strict'

/**
 * Find deeply nested keys in object using searchKey
 * @author Rajan Tiwari <tiwarirajan@hotmail.com>
 * @param {object | []} objectToSearch Object or Array on which search needs to performed
 * @param {String | [String]} searchKey Object key to be searched in objectToSearch
 * @param {{ nested: Boolean}} options Optional object to search nested keys, is false by default
 * @returns {array} Found value for searchKey, could be any type of value.
 *
 * @example
 * const objectToSearch = {
 *  id: '0001',
 *  type: 'donut',
 *  name: 'Cake',
 *  ppu: 0.55,
 *  batters: {
 *    batter: [
 *      { id: '1001', type: 'Regular' },
 *      { id: '1002', type: 'Chocolate' },
 *      { id: '1003', type: 'Blueberry' },
 *      { id: '1004', type: "Devil's Food" }
 *    ]
 *  }
 * }
 * let searchKey = 'batter'
 * findDeep(objectToSearch, searchKey)
 * // result
 * //  [
 * //     { id: '1001', type: 'Regular' },
 * //     { id: '1002', type: 'Chocolate' },
 * //     { id: '1003', type: 'Blueberry' },
 * //     { id: '1004', type: "Devil's Food" }
 * //  ]
 */
function findDeep(objectToSearch, searchKey, options = { nested: false  }) {
  const { nested = false } = options
  if (!searchKey) return objectToSearch
  if (typeof(searchKey) === 'string') return findDeepKeys(objectToSearch, [searchKey])

  const isArray = typeof(searchKey) === 'object' && Array.isArray(searchKey)

  if (isArray && nested) return findDeepNestedKeys(objectToSearch, searchKey)
  if (isArray) return findDeepKeys(objectToSearch, searchKey)
  throw new Error('Invalid searchKey')
}

function findDeepKeys(objectToSearch, searchKeys) {
  if (!objectToSearch || typeof objectToSearch !== 'object') return null
  const foundValues = [...objectKeyValue(objectToSearch, searchKeys)  ]

  // works for arrays and objects
  for (const iterator of Object.values(objectToSearch)) {
    const result = findDeepKeys(iterator, searchKeys)
    if (result !== null) foundValues.push(...result)
  }
  return foundValues
}

function objectKeyValue(objectToSearch, searchKeys = []) {
  const objectValues = []
  searchKeys.forEach(searchKey => {
    const objectValue = objectToSearch[searchKey]
    if(objectValue) objectValues.push(objectValue)
  })
  return objectValues
}

function findDeepNestedKeys(objectToSearch, searchKeys) {
  let foundValues = objectToSearch

  for (const searchKey of searchKeys) {
    foundValues = findDeepKeys(foundValues, [searchKey])
    if (foundValues === null) return []
  }
  return foundValues
}

module.exports = findDeep
