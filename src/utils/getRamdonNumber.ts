export const getRandomNumber = (min?: number, max?: number) => {
  if (!min || !max) return Math.random()
  const randomNumber = Math.random() * (max - min) + min
  return Math.floor(randomNumber)
}
