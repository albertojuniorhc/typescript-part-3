import { DaysOfWeek } from "../enums/daysOfWeek.js";
import { Negotiation } from "../models/negotiation.js";
import { Negotiations } from "../models/negotiations.js";
import { messageView } from "../views/messageView.js";
import { NegotiationsView } from "../views/negotiationsView.js";
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView("#negotiationsView");
        this.messageView = new messageView("#messageView");
        this.inputDate = document.querySelector("#data");
        this.inputAmount = document.querySelector("#amount");
        this.inputValue = document.querySelector("#valor");
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createFrom(this.inputDate.value, this.inputAmount.value, this.inputValue.value);
        if (!this.isWorkingDay(negotiation.date)) {
            this.messageView.update("Only accept trades on working days.");
            return;
        }
        this.negotiations.add(negotiation);
        this.cleanForm();
        this.updateView();
    }
    isWorkingDay(date) {
        const day = date.getDay();
        return day > DaysOfWeek.SUNDAY && day < DaysOfWeek.SATURDAY;
    }
    cleanForm() {
        this.inputDate.value = "";
        this.inputAmount.value = "1";
        this.inputValue.value = "0.0";
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update("Trading successfully added!");
    }
}
