export default function chunk<T extends any[]>(arr: T, size: number) {
  return arr.reduce(
    (newarr, _, i) => (i % size ? newarr : [...newarr, arr.slice(i, i + size)]),
    [] as T[][]
  );
}
