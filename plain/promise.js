export function promise() {
  return new Promise((resolve) => resolve())
}

export function promiseThrow() {
  return new Promise((resolve) => {
    throw `I'm an error thrown from a promise`
    resolve()
  })
}
