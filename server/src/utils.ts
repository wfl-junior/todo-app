export function Trim() {
  return function(target: Object, key: string) {
    const _key = Symbol();

    Object.defineProperty(target, key, {
      get() {
        return this[_key];
      },
      set(val: string) {
        this[_key] = val.trim().replace(/\s\s+/g, " ");
      },
      configurable: true,
      enumerable: true
    });
  };
}
