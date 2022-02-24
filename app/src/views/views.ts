import { inspect } from "../decorators/inspect.js";
import { logRunTime } from "../decorators/logRunTime.js";

export abstract class View<T> {
  protected element: HTMLElement;

  constructor(selector: string) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Selector ${selector} did not exist on DOM`);
    }
  }
  @logRunTime(true)
  @inspect
  public update(model: T): void {
    let template = this.template(model);
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
