import { EventHandler } from "rich-domain";
import PurchaseEvents from "./index";
import Purchase from "../aggregates/purchase";

export class PurchaseConfirmed extends EventHandler<Purchase> {
    constructor() {
        super({ eventName: PurchaseEvents.PURCHASE_CONFIRMED })
    }

    dispatch(entity: Purchase): void {
        const model = entity.toObject();
        entity.context().dispatchEvent('main:sample', model);
    }
}

export default PurchaseConfirmed;
