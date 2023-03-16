
import { Entity, Ok, Result, UID } from 'rich-domain';
import Money from '../value-objects/money';

interface Props {
    id?: UID;
    amount: Money;
    fees: Money;
    discount: Money;
}

export class Payment extends Entity<Props>{
    private constructor(props: Props){
        super(props);
    }

    applyFee(fee: Money): Payment {
        this.props.fees = fee;
        this.props.amount = this.props.amount.sum(fee);
        return this;
    }

    applyDiscount(discount: Money): Payment {
        this.props.discount = discount;
        this.props.amount = this.props.amount.subtract(discount);
        return this;
    }

    public static create(props: Props): Result<Payment> {
        const payment = new Payment(props);
        if(payment.isNew()) payment.applyDiscount(props.discount).applyFee(props.fees);
        return Ok(payment);
    }
};

export default Payment;
