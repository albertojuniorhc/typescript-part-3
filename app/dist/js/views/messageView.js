import { View } from "./views.js";
export class messageView extends View {
    template(model) {
        return `
        <p class="alert alert-info">${model}</p>
    `;
    }
}
