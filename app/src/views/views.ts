import { inspect } from "../decorators/inspect.js";
import { logRunTime } from "../decorators/logRunTime.js";

export abstract class View<T> {
  protected element: HTMLElement;
  private scape = false;

  constructor(selector: string, scape?: boolean) {
    const element = document.querySelector(selector);
    if (element) {
      this.element = element as HTMLElement;
    } else {
      throw Error(`Selector ${selector} did not exist on DOM`);
    }

    if (scape) {
      this.scape = scape;
    }
  }
  @logRunTime(true)
  @inspect()
  public update(model: T): void {
    let template = this.template(model);
    if (this.scape) {
      template = template.replace(/<script>[\s\S]*?<script>/, "");
    }
    this.element.innerHTML = template;
  }

  protected abstract template(model: T): string;
}
