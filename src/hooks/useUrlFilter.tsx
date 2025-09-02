import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

interface IUseUrlFilterParams<T> {
  name: string;
  delay?: number;
  callback?: (value: T | undefined | null) => void;
}

const useUrlFilter = <T,>({
  name,
  delay = 0,
  callback,
}: IUseUrlFilterParams<T>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = useMemo(() => {
    const originalValue = searchParams.get(name);

    if (originalValue === null || originalValue === undefined) return null;

    if (!isNaN(Number(originalValue)))
      return Number(originalValue) as unknown as T;

    if (originalValue === "true" || originalValue === "false")
      return (originalValue === "true") as unknown as T;

    return originalValue as unknown as T;
  }, [searchParams, name]);

  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: T | undefined | null) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value !== null && value !== undefined && value !== "") {
          params.set(name, value.toString());
        } else {
          params.delete(name);
        }
        router.push(`${pathname}?${params.toString()}`);
      }, delay),
    [name, searchParams, router, delay, pathname]
  );

  useEffect(() => {
    if (callback) callback(value);
  }, [value, callback]);

  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  return [value, debouncedSetFilter] as const;
};

export default useUrlFilter;
