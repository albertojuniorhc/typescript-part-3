import { domInjector } from '../decorators/domInjector.js'
import { inspect } from '../decorators/inspect.js'
import { logRunTime } from '../decorators/logRunTime.js'
import { DaysOfWeek } from '../enums/daysOfWeek.js'
import { Negotiation } from '../models/negotiation.js'
import { Negotiations } from '../models/negotiations.js'
import { messageView } from '../views/messageView.js'
import { NegotiationsView } from '../views/negotiationsView.js'
import { NegotiationsService } from '../services/negotiationsService.js'
import { print } from '../utils/print.js'

export class NegotiationController {
  @domInjector('#data')
  private inputDate: HTMLInputElement

  @domInjector('#amount')
  private inputAmount: HTMLInputElement

  @domInjector('#valor')
  private inputValue: HTMLInputElement

  private negotiations: Negotiations = new Negotiations()
  private negotiationsView = new NegotiationsView('#negotiationsView')
  private messageView = new messageView('#messageView')
  private negotiationsService = new NegotiationsService()

  constructor() {
    this.negotiationsView.update(this.negotiations)
  }
  @logRunTime()
  @inspect
  public add(): void {
    const negotiation = Negotiation.createFrom(
      this.inputDate.value,
      this.inputAmount.value,
      this.inputValue.value,
    )
    if (!this.isWorkingDay(negotiation.date)) {
      this.messageView.update('Only accept trades on working days.')
      return
    }
    this.negotiations.add(negotiation)
    print(negotiation, this.negotiations)
    this.cleanForm()
    this.updateView()
  }

  public importData(): void {
    this.negotiationsService.getTodayNegotiations()
    .then(todayNegotiations => {
      return todayNegotiations.filter(todayNegotiations => {
        return !this.negotiations
          .list()
          .some(negotiation => negotiation.isEqual(todayNegotiations))
      });
    })
    .then((todayNegotiations) => {
      for (let negotiation of todayNegotiations) {
        this.negotiations.add(negotiation)
      }
      this.updateView()
    })
  }

  private isWorkingDay(date: Date) {
    const day = date.getDay()
    return day > DaysOfWeek.SUNDAY && day < DaysOfWeek.SATURDAY
  }

  private cleanForm(): void {
    this.inputDate.value = ''
    this.inputAmount.value = '1'
    this.inputValue.value = '0.0'
    this.inputDate.focus()
  }

  private updateView(): void {
    this.negotiationsView.update(this.negotiations)
    this.messageView.update('Trading successfully added!')
  }
}
