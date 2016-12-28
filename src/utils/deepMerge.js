import { isArray, isObject, isRegExp, isDate, isDefined } from 'magic-types'

const isMergeableObject =
  (val) =>
    val &&
    isObject(val) &&
    !isRegExp(val) &&
    !isDate(val)

const mergeArray =
  (target, source) => {
    const destination = target.slice()
    source.forEach((e, i) => {
      if (!isDefined(destination[i])) {
        destination[i] = e
      }
      else if (isMergeableObject(e)) {
        destination[i] = deepMerge(target[i], e)
      }
      else if (target.indexOf(e) === -1) {
        destination.push(e)
      }
    })

    return destination
  }

const mergeObject =
  (target, source) => {
    const destination = {}
    if (isMergeableObject(target)) {
      Object.keys(target).forEach(
        (key) => {
          destination[key] = target[key]
        }
      )
    }

    Object.keys(source).forEach(
      (key) => {
        if (!isMergeableObject(source[key]) || !target[key]) {
          destination[key] = source[key]
        }
        else {
          destination[key] = deepMerge(target[key], source[key])
        }
      }
    )

    return destination
  }

const deepMerge =
  (target, source) =>
    isArray(source)
      ? isArray(target)
        ? mergeArray(target, source)
        : source
      : mergeObject(target, source)

const deepMergeAll =
  (array) => {
    if (!isArray(array)) {
      throw new Error('First argument should be an array with two items.')
    }

    // bail early if there is only one item
    if (array.length === 1) {
      return array[0]
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(
      (prev, next) =>
        deepMerge(prev, next)
    )
  }

export const merge = deepMerge
export const mergeAll = deepMergeAll

export default {
  merge,
  mergeAll,
}
