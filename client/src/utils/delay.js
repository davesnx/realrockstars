const delay = (ms) => {
  return new Promise((resolve, _) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export default delay
