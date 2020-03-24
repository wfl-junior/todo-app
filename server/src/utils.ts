type MyPropDecorator = (target: Object, key: string) => void;

export function Trim(): MyPropDecorator {
  return function(target, key) {
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
