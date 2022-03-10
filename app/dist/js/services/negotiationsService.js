import { Negotiation } from '../models/negotiation.js';
export class NegotiationsService {
    getTodayNegotiations() {
        return fetch('http://localhost:8080/dados')
            .then((res) => res.json())
            .then((data) => {
            return data.map((dataItem) => {
                return new Negotiation(new Date(), dataItem.vezes, dataItem.montante);
            });
        });
    }
}
