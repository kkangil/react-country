export const sortByKeyDesc = (array, key) => {
  return array.sort((a, b) => {
    const x = typeof a[key] === 'object' ? a[key].join(', ') : a[key]
    const y = typeof b[key] === 'object' ? b[key].join(', ') : b[key]
    return x < y ? 1 : x > y ? -1 : 0
  })
}

export const sortByKeyAsc = (array, key) => {
  return array.sort((a, b) => {
    const x = typeof a[key] === 'object' ? a[key].join(', ') : a[key]
    const y = typeof b[key] === 'object' ? b[key].join(', ') : b[key]
    return x < y ? -1 : x > y ? 1 : 0
  })
}
