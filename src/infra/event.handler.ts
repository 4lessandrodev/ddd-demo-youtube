import { EventHandler, HandlerPayload, ICommand } from "rich-domain";
import Purchase from "../domain/aggregates/purchase";

export class PurchaseConfirmedHandler implements EventHandler<Purchase, void>{

    constructor(
        private readonly mailer: ICommand<string, void>
    ){}

    execute(data: HandlerPayload<Purchase>): void {

        const obj = data.aggregate.toObject();
        console.log('---------------------------');
        const email = `Ola ${obj.buyer.name},\nSeu pagamento no valor de R$ ${obj.payment.amount} foi aprovado com sucesso!\n\nAtt,\nTime App XYZ`;
        this.mailer.execute(email);
        console.log('---------------------------');
    }
}
export default PurchaseConfirmedHandler;
