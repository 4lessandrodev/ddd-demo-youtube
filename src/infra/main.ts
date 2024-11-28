import { Result, Context } from "rich-domain";
import ProcessPayment from "../application/use-case";
import Purchase from "../domain/aggregates/purchase";
import PurchaseEvents from "../domain/events";
import PurchaseConfirmedHandler from "./event.handler";
const useCase = new ProcessPayment();
const events = Context.events();
const mailer = new PurchaseConfirmedHandler({ execute: console.log });

events.subscribe('main:sample', (event) => {
    const [model] = event.detail;
    mailer.execute(model);
})

const main = (): void => {
    const amount = Number(process.argv[2]);
    const discount = Number(process.argv[3]);
    const fee = Number(process.argv[4]);
    const user = process.argv[5];

    const callback = (res: Result<Purchase | null>): void => {
        if (res.isFail()) return console.log(res.error());
        const purchase = res.value() as Purchase;
        purchase.dispatchEvent(PurchaseEvents.PURCHASE_CONFIRMED);
    };

    useCase.execute({ amount, discount, fee, user }).then(callback);

}

main();
