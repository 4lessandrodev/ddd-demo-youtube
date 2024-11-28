import { Aggregate, Ok, Result, UID } from "rich-domain";
import { OrderStatusValueObject as Status } from 'types-ddd';
import { PinValueObject as Pin } from 'types-ddd';
import Buyer from "../entities/buyer";
import Payment from "../entities/payment";
import PurchaseConfirmed from "../events/confirmed.event";

interface Props {
    id?: UID;
    status: Status;
    code: Pin;
    payment: Payment;
    buyer: Buyer;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Purchase extends Aggregate<Props>{
    private constructor(props: Props){
        super(props);
    }

    public static begin(props: Omit<Props, 'status' | 'code'>): Purchase {
        const status = Status.create('PENDING').value() as Status;
        const code = Pin.generatePin({ lettersLength: 3, numbersLength: 3 }).value() as Pin;
        return new Purchase({ ...props, status, code });
    }

    confirm(): Purchase {
        const status = Status.create('COMPLETED').value();
        this.addEvent(new PurchaseConfirmed());
        this.props.status = status as Status;
        return this;
    }

    public static create(props: Props): Result<Purchase> {
        return Ok(new Purchase(props));
    }
}

export default Purchase;
