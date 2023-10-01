import { Fail, Ok, Result, ValueObject } from "rich-domain";

interface Props {
    value: number;
}

export class Money extends ValueObject<Props>{
    private constructor(props: Props){
        super(props)
    }

    subtract(value: Money): Money {
        const { number: Calc } = this.util;
        const target = value.get('value');
        const current = this.get('value');
        const amount = Calc(current).subtract(target);
        return new Money({ value: amount });
    }

    sum(value: Money): Money {
        const { number: Calc } = this.util;
        const target = value.get('value');
        const current = this.get('value');
        const amount = Calc(current).sum(target);
        return new Money({ value: amount });
    }
    
    public static isValidProps({ value }: Props): boolean {
        const { number: Checker } = this.validator;
        const closure = Checker(value);
        const isPositive = closure.isPositive();
        return isPositive;
    }
    public static zero(): Money {
        return new Money({ value: 0 });
    }

    public static create(value: number): Result<Money> {
        const isPositive = Money.isValidProps({ value });
        if(!isPositive) return Fail('The value must be positive');
        return Ok(new Money({ value }));
    }
};

export default Money;
