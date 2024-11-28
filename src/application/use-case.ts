import { Combine, Fail, IUseCase, Ok, Result } from "rich-domain";
import { UserNameValueObject as UserName } from "types-ddd";
import Purchase from "../domain/aggregates/purchase";
import Money from "../domain/value-objects/money";
import Buyer from "../domain/entities/buyer";
import Payment from "../domain/entities/payment";

interface Dto {
    amount: number; 
    discount: number;
    fee: number;
    user: string;
}

export class ProcessPayment implements IUseCase<Dto, Result<Purchase | null>>{
    async execute(dto: Dto): Promise<Result<Purchase | null>> {
        // regras
        const amountResult = Money.create(dto.amount);
        const discountResult = Money.create(dto.discount);
        const feeResult = Money.create(dto.fee);
        const buyerNameResult = UserName.create(dto.user);
    
        const results = Combine([ 
            amountResult, 
            discountResult, 
            feeResult,
            buyerNameResult
        ]);

        if(results.isFail()) return Fail(results.error());

        const amount = amountResult.value() as Money;
        const discount = discountResult.value() as Money;
        const fees = feeResult.value() as Money;
        const name = buyerNameResult.value() as UserName;

        const props = { amount, discount, fees };

        const paymentResult = Payment.create(props);
        if(paymentResult.isFail()) return Fail(paymentResult.error());

        const payment = paymentResult.value();

        const buyerResult = Buyer.create({ name });
        if(buyerResult.isFail()) return Fail(buyerResult.error());

        const buyer = buyerResult.value();

        const purchase = Purchase.begin({ buyer, payment });

        purchase.confirm();

        return Ok(purchase);
    }
}

export default ProcessPayment;
