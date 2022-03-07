var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { domInjector } from '../decorators/domInjector.js';
import { inspect } from '../decorators/inspect.js';
import { logRunTime } from '../decorators/logRunTime.js';
import { DaysOfWeek } from '../enums/daysOfWeek.js';
import { Negotiation } from '../models/negotiation.js';
import { Negotiations } from '../models/negotiations.js';
import { messageView } from '../views/messageView.js';
import { NegotiationsView } from '../views/negotiationsView.js';
export class NegotiationController {
    constructor() {
        this.negotiations = new Negotiations();
        this.negotiationsView = new NegotiationsView('#negotiationsView');
        this.messageView = new messageView('#messageView');
        this.negotiationsView.update(this.negotiations);
    }
    add() {
        const negotiation = Negotiation.createFrom(this.inputDate.value, this.inputAmount.value, this.inputValue.value);
        if (!this.isWorkingDay(negotiation.date)) {
            this.messageView.update('Only accept trades on working days.');
            return;
        }
        this.negotiations.add(negotiation);
        this.cleanForm();
        this.updateView();
    }
    importData() {
        fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((data) => {
            return data.map(dataItem => {
                return new Negotiation(new Date(), dataItem.vezes, dataItem.montante);
            });
        })
            .then(todayNegotiations => {
            for (let negotiation of todayNegotiations) {
                this.negotiations.add(negotiation);
            }
            this.updateView();
        });
    }
    isWorkingDay(date) {
        const day = date.getDay();
        return day > DaysOfWeek.SUNDAY && day < DaysOfWeek.SATURDAY;
    }
    cleanForm() {
        this.inputDate.value = '';
        this.inputAmount.value = '1';
        this.inputValue.value = '0.0';
        this.inputDate.focus();
    }
    updateView() {
        this.negotiationsView.update(this.negotiations);
        this.messageView.update('Trading successfully added!');
    }
}
__decorate([
    domInjector('#data')
], NegotiationController.prototype, "inputDate", void 0);
__decorate([
    domInjector('#amount')
], NegotiationController.prototype, "inputAmount", void 0);
__decorate([
    domInjector('#valor')
], NegotiationController.prototype, "inputValue", void 0);
__decorate([
    logRunTime(),
    inspect
], NegotiationController.prototype, "add", null);
