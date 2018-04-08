import { randInt, randRangeInt } from './rand'

export const getColor = (h=0, s=50, l=50) => `hsl(${h}, ${s}%, ${l}%)`

export const getRandomHue = (max=360) => randInt(max)

export const getColorsIncrementHue = (seed, options) => {

  const {
    length = 1,
    increment: inc = 10,
    saturation: s = 50,
    lightness: l = 50,
    min = 0,
    max = 360,
  } = options

  return Array(length)
    .fill(seed)
    .map((start, i) => getColor((seed + (inc * i) % max + min), s, l))
}