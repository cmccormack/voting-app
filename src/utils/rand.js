export const randInt = (max) => Math.floor(Math.random() * max)

export const randRangeInt = (min, max) => (
  Math.floor((Math.random() * (max - min)) + min)
)