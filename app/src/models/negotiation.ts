import { Printable } from "../utils/printable.js";

export class Negotiation implements Printable {
  constructor(
    private _date: Date,
    public readonly amount: number,
    public readonly value: number
  ) {}

  get volume(): number {
    return this.amount * this.value;
  }

  get date(): Date {
    const date = new Date(this._date.getTime());
    return date;
  }

  public toText(): string {
    return `
    Date: ${this.date},
    Amount: ${this.amount},
    Value: ${this.value}
    `;
  }

  public static createFrom(dateString: string, amountString: string, valueString: string): Negotiation{
    const regExp = /-/g;
    const date = new Date(dateString.replace(regExp, ","));
    const amount = parseInt(amountString);
    const value = parseFloat(valueString);
    return new Negotiation(date, amount, value);
  }

  public isEqual(negotiation: Negotiation): boolean{
    return this.date.getDate() === negotiation.date.getDate()
      && this.date.getMonth() === negotiation.date.getMonth()
      && this.date.getFullYear() === negotiation.date.getFullYear();
  }
}
