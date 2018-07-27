const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min

const delay = ms => new Promise(res => setTimeout(res, ms))

module.exports = {
  getRandomInt,
  delay
}
