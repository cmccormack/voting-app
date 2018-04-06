import { randInt, randRangeInt } from './rand'

export const getColor = (h, s, l) => `hsl(${h}, ${s}%, ${l}%)`

export const getColorsIncrementHue = (length, inc=10, s, l, min=0, max=360) => (
  Array(length).fill(randRangeInt(min, max))
  .map((start,i) => getColor((start+(inc*i)%360+min), s, l))
)