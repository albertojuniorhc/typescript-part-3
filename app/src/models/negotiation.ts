export class Negotiation {
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

  public static createFrom(dateString: string, amountString: string, valueString: string): Negotiation{
    const regExp = /-/g;
    const date = new Date(dateString.replace(regExp, ","));
    const amount = parseInt(amountString);
    const value = parseFloat(valueString);
    return new Negotiation(date, amount, value);
  }
}
