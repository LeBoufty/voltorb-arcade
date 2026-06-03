// Too lazy to code this :
// https://www.xjavascript.com/blog/typescript-random-number/
// Thank you

export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement<T>(array: T[]): T {
  const randomIndex: number = getRandomInt(0, array.length - 1);
  return array[randomIndex] as T;
}

export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = getRandomInt(0, i);
    [array[i], array[j]] = [array[j] as T, array[i] as T];
  }
  return array;
}
