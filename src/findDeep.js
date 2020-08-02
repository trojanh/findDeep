'use strict'

/**
 * Find deeply nested keys in object using searchKey
 * @author Rajan Tiwari <tiwarirajan@hotmail.com>
 * @param {(array|object)} objectToSearch Object or Array on which search needs to performed
 * @param {String} searchKey Object key to be searched in objectToSearch
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
function findDeep(objectToSearch, searchKey) {
  if (!objectToSearch || typeof objectToSearch !== 'object') return null
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
