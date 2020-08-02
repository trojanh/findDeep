const findDeep = require('../src/findDeep')
const exampleJson1 = require('./fixtures/example1')
const exampleJson2 = require('./fixtures/example2')
const exampleJson3 = require('./fixtures/example3')
const exampleJson4 = require('./fixtures/example4')

test('find searchKey in object with single key', () => {
  const [result] = findDeep(exampleJson1, 'maxUrlLength')
  const expectedResult =
    exampleJson1['web-app']['servlet'][0]['init-param']['maxUrlLength']
  expect(result).toBe(expectedResult)
})

test('find searchKey in object with multiple keys', () => {
  const result = findDeep(exampleJson1, 'servlet-name')
  expect(result.length).toBe(5)
  expect(result).toStrictEqual([
    'cofaxCDS',
    'cofaxEmail',
    'cofaxAdmin',
    'fileServlet',
    'cofaxTools'
  ])
})

test('find searchKey in array with multiple keys(with object values)', () => {
  const result = findDeep(exampleJson3, 'batters')
  expect(result.length).toBe(3)
  expect(result).toStrictEqual([
    {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' },
        { id: '1003', type: 'Blueberry' },
        { id: '1004', type: "Devil's Food" }
      ]
    },
    { batter: [{ id: '1001', type: 'Regular' }] },
    {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' }
      ]
    }
  ])
})

test('find searchKey in array with multiple keys(with string values)', () => {
  const result = findDeep(exampleJson3, 'type')
  expect(result.length).toBe(26)
  expect(result).toStrictEqual([
    'donut',
    'Regular',
    'Chocolate',
    'Blueberry',
    "Devil's Food",
    'None',
    'Glazed',
    'Sugar',
    'Powdered Sugar',
    'Chocolate with Sprinkles',
    'Chocolate',
    'Maple',
    'donut',
    'Regular',
    'None',
    'Glazed',
    'Sugar',
    'Chocolate',
    'Maple',
    'donut',
    'Regular',
    'Chocolate',
    'None',
    'Glazed',
    'Chocolate',
    'Maple'
  ])
})

test('find searchKey in large json array with multiple keys', () => {
  const result = findDeep(exampleJson2, 'range')
  expect(result.length).toBe(5)
  expect(result).toStrictEqual([
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  ])
})

test('find searchKey in large json array with deep searchKey', () => {
  const result = findDeep(exampleJson2, 'taglibAutoContinueBatters')
  expect(result).toStrictEqual([
    {
      batter: [
        { id: '1001', type: 'Regular' },
        { taglibAutoContinueId: '1002', type: 'Chocolate' }
      ]
    }
  ])

  const result1 = findDeep(exampleJson2, 'taglibAutoContinueId')
  expect(result1).toStrictEqual(['1002'])
})


test('find searchKey in extremely large(1.5MB) json array with deep searchKey', () => {
  const result = findDeep(exampleJson4, 'displayName')
  expect(result.length).toStrictEqual(238)
})