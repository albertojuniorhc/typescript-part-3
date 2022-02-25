export function domInjector(selector: string) {
  return function (target: any, propertyKey: string) {
    console.log(
      `Changing prototype ${target.constructor.name} and adding getter to the prop ${propertyKey}`
    );
    let element: HTMLElement;

    const getter = function () {
      if (!element) {
        element = <HTMLElement>document.querySelector(selector);
        console.log(
          `Getting DOM's element with selector ${selector} to inject in ${propertyKey}`
        );
      }
      return element;
    };
    Object.defineProperty(target, propertyKey, {
      get: getter,
    });
  };
}
