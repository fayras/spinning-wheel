export const debounce = <T extends unknown[]>(
  callback: (...args: T) => unknown,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(this, args), wait);
  };
};
