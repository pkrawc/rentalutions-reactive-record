
export const deepPrune = (schema, records) => records.map(record =>
  Object.keys(schema).reduce((prev, curr) => {
    if (record[curr]) {
      if (typeof record[curr] === 'object' && !Array.isArray(record[curr])) {
        console.log(record[curr])
        return {
          ...prev,
          [curr]: deepPrune(schema[curr], Object.keys(record[curr]))
        }
      } else {
        console.log('not an object and not an array', typeof record[curr])
        return {
          ...prev,
          [curr]: record[curr]
        }
      }
    } else {
      console.log('not found in schema')
      return prev
    }
  }, {}))

// const prune = (schema, records) => {
//   return records.isArray ? (
//     console.log('the records are an array')
//     records.map(record => Object.keys(schema).reduce((prunedObject, currentSchemaKey) => {
//       if (record[currentSchemaKey]) {
//         // the record has a matching key
//         if (typeof currentSchemaKey == 'object') {
//           prune(currentSchemaKey, record[currentSchemaKey])
//         } else {
//           return {
//             ...prunedObject,
//             [currentSchemaKey]: record[currentSchemaKey]
//           }
//         }
//       } else {
//         return prunedObject
//       }
//     }, {}))
//   ) : (
//     console.log('the records are not an array')
//     records.map(record => Object.keys(schema).reduce((prunedObject, currentSchemaKey) => {
//       if (record[currentSchemaKey]) {
//         // the record has a matching key
//         if (typeof currentSchemaKey == 'object') {
//           prune(currentSchemaKey, record[currentSchemaKey])
//         } else {
//           return {
//             ...prunedObject,
//             [currentSchemaKey]: record[currentSchemaKey]
//           }
//         }
//       } else {
//         return prunedObject
//       }
//     }, {}))
//   )
// }
