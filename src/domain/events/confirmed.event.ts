import { EventHandler, IDomainEvent, IHandle as DomainEvent } from "rich-domain";
import PurchaseEvents from "./index";
import Purchase from "../aggregates/purchase";

export class PurchaseConfirmed implements DomainEvent<Purchase>{
    public eventName: string;
    constructor() {
        this.eventName = PurchaseEvents.PURCHASE_CONFIRMED;
    }

    dispatch(event: IDomainEvent<Purchase>, handler: EventHandler<Purchase, void>): void {
        console.log('Domain Event Called');
        handler.execute({ aggregate: event.aggregate, eventName: this.eventName });
    }
}

export default PurchaseConfirmed;
