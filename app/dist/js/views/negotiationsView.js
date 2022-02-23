import { View } from "./views.js";
export class NegotiationsView extends View {
    template(model) {
        return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Value</th>
            </tr>
        </thead>
    <tbody>
      ${model
            .list()
            .map((negotiation) => {
            return `
          <tr>
            <td>${this.formatDate(negotiation.date)}</td>
            <td>${negotiation.amount}</td>
            <td>${negotiation.value}</td>
          </tr>
        `;
        })
            .join("")}
    </tbody>
    </table>
    `;
    }
    formatDate(date) {
        return new Intl.DateTimeFormat().format(date);
    }
}
