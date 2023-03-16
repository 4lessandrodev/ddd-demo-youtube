import { CurrencyValueObject as Money } from 'types-ddd';

const money = Money.create({
    value: 100,
    currency: 'BRL'
});

console.log(money.isOk());
console.log(money.isFail());
console.log(money.value().get('value'));

console.log(money.value().getCoin());
console.log(money.value().add(100).getCoin());
