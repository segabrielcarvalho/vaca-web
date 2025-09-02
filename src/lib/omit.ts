export default function omit<
  T extends Record<PropertyKey, unknown>,
  K extends keyof T
>(obj: T, keys: readonly K[]): Omit<T, K> {
  return Object.fromEntries(
    Object.entries(obj).filter(([prop]) => !keys.includes(prop as K))
  ) as Omit<T, K>;
}
