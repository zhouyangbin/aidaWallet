export const array2Object = (arr) => {
  if (arr.length === 0 ) return
  let obj = {}
  for (let key in arr ) {
    if (parseInt(key) !== Number(key)) {
      obj[key] = arr[key]
    }
  }
  return obj
}