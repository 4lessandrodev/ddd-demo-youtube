import { HandlerPayload, ICommand } from "rich-domain";
import Purchase from "../domain/aggregates/purchase";

export class PurchaseConfirmedHandler {

    constructor(
        private readonly mailer: ICommand<string, void>
    ){}

    execute(obj: any): void {
        console.log('---------------------------');
        const email = `Ola ${obj.buyer.name.value},\nSeu pagamento no valor de R$ ${obj.payment.amount.value} foi aprovado com sucesso!\n\nAtt,\nTime App XYZ`;
        this.mailer.execute(email);
        console.log('---------------------------');
    }
}
export default PurchaseConfirmedHandler;
