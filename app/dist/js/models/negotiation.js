export class Negotiation {
    constructor(_date, amount, value) {
        this._date = _date;
        this.amount = amount;
        this.value = value;
    }
    get volume() {
        return this.amount * this.value;
    }
    get date() {
        const date = new Date(this._date.getTime());
        return date;
    }
    toText() {
        return `
    Date: ${this.date},
    Amount: ${this.amount},
    Value: ${this.value}
    `;
    }
    static createFrom(dateString, amountString, valueString) {
        const regExp = /-/g;
        const date = new Date(dateString.replace(regExp, ","));
        const amount = parseInt(amountString);
        const value = parseFloat(valueString);
        return new Negotiation(date, amount, value);
    }
    isEqual(negotiation) {
        return this.date.getDate() === negotiation.date.getDate()
            && this.date.getMonth() === negotiation.date.getMonth()
            && this.date.getFullYear() === negotiation.date.getFullYear();
    }
}
