export function domInjector(selector: string) {
  return function (target: any, propertyKey: string) {
    const getter = function () {
      const element = document.querySelector(selector);
      console.log(`Getting DOM's element with selector ${selector} to inject in ${propertyKey}`)
      return element;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
    });
  };
}
