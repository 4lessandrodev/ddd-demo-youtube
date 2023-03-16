import { Result } from "rich-domain";
import ProcessPayment from "../application/use-case";
import Purchase from "../domain/aggregates/purchase";
import PurchaseEvents from "../domain/events";
import PurchaseConfirmedHandler from "./event.handler";
const useCase = new ProcessPayment();
const eventHandler = new PurchaseConfirmedHandler({ execute: console.log });

const main = (): void => {
    const amount = Number(process.argv[2]);
    const discount = Number(process.argv[3]);
    const fee = Number(process.argv[4]);
    const user = process.argv[5];

    const callback = (res: Result<Purchase>): void => {
        if (res.isFail()) return console.log(res.error());
        const purchase = res.value();
        purchase.dispatchEvent(PurchaseEvents.PURCHASE_CONFIRMED, eventHandler);
    };

    useCase.execute({ amount, discount, fee, user }).then(callback);

}

main();
