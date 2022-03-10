import { TodayNegotiations } from '../interfaces/todayNegotiation.js'
import { Negotiation } from '../models/negotiation.js'

export class NegotiationsService {
  public getTodayNegotiations(): Promise<Negotiation[]> {
    return fetch('http://localhost:8080/dados')
      .then((res) => res.json())
      .then((data: TodayNegotiations[]) => {
        return data.map((dataItem) => {
          return new Negotiation(new Date(), dataItem.vezes, dataItem.montante)
        })
      });
  }
}
