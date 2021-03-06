# findDeep
![tests](https://github.com/trojanh/findDeep/workflows/tests/badge.svg)

Easily find all values for a key in long deeply nested objects or arrays

## install

```bash
npm install finddeepjs
```

## Examples

```js
const findDeep = require('finddeepjs')
const nestedObject = [
  {
    id: '0001',
    type: 'donut',
    name: 'Cake',
    ppu: 0.55,
    batters: {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' },
        { id: '1003', type: 'Blueberry' },
        { id: '1004', type: "Devil's Food" }
      ]
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5005', type: 'Sugar' },
      { id: '5007', type: 'Powdered Sugar' },
      { id: '5006', type: 'Chocolate with Sprinkles' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' }
    ]
  },
  {
    id: '0002',
    type: 'donut',
    name: 'Raised',
    ppu: 0.55,
    batters: {
      batter: [{ id: '1001', type: 'Regular' }]
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5005', type: 'Sugar' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' }
    ]
  },
  {
    id: '0003',
    type: 'donut',
    name: 'Old Fashioned',
    ppu: 0.55,
    batters: {
      batter: [
        { id: '1001', type: 'Regular' },
        { id: '1002', type: 'Chocolate' }
      ]
    },
    topping: [
      { id: '5001', type: 'None' },
      { id: '5002', type: 'Glazed' },
      { id: '5003', type: 'Chocolate' },
      { id: '5004', type: 'Maple' }
    ]
  }
]

findDeep(nestedObject, 'batter')

/* output
[
  [
    { id: '1001', type: 'Regular' },
    { id: '1002', type: 'Chocolate' },
    { id: '1003', type: 'Blueberry' },
    { id: '1004', type: "Devil's Food" }
  ],
  [{ id: '1001', type: 'Regular' }],
  [
    { id: '1001', type: 'Regular' },
    { id: '1002', type: 'Chocolate' }
  ]
]
*/


// multi key search
findDeep(nestedObject, ['name', 'ppu'])
/* output
[ 'Cake', 0.55, 'Raised', 0.55, 'Old Fashioned', 0.55 ]
*/

// nested key search

findDeep(nestedObject, ['batters', 'batter', 'type'], { nested: true })
/*
[
  'Regular',
  'Chocolate',
  'Blueberry',
  "Devil's Food",
  'Regular',
  'Regular',
  'Chocolate'
]
*/



```
