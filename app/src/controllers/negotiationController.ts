import { logRunTime } from "../decorators/logRunTime.js";
import { DaysOfWeek } from "../enums/daysOfWeek.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { messageView } from "../views/messageView.js";
import { NegotiationsView } from "../views/negotiationsView.js";

export class NegotiationController {
  private inputDate: HTMLInputElement;
  private inputAmount: HTMLInputElement;
  private inputValue: HTMLInputElement;
  private negotiations: Negotiations = new Negotiations();
  private negotiationsView = new NegotiationsView("#negotiationsView", true);
  private messageView = new messageView("#messageView");

  constructor() {
    this.inputDate = <HTMLInputElement>document.querySelector("#data");
    this.inputAmount = document.querySelector("#amount") as HTMLInputElement;
    this.inputValue = document.querySelector("#valor") as HTMLInputElement;
    this.negotiationsView.update(this.negotiations);
  }

  @logRunTime()
  public add(): void {
    const negotiation = Negotiation.createFrom(
      this.inputDate.value,
      this.inputAmount.value,
      this.inputValue.value
    );
    if (!this.isWorkingDay(negotiation.date)) {
      this.messageView.update("Only accept trades on working days.");
      return;
    }
    this.negotiations.add(negotiation);
    this.cleanForm();
    this.updateView();
  }

  private isWorkingDay(date: Date) {
    const day = date.getDay();
    return day > DaysOfWeek.SUNDAY && day < DaysOfWeek.SATURDAY;
  }

  private cleanForm(): void {
    this.inputDate.value = "";
    this.inputAmount.value = "1";
    this.inputValue.value = "0.0";
    this.inputDate.focus();
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations);
    this.messageView.update("Trading successfully added!");
  }
}
