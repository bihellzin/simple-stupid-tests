import { find, remove } from 'lodash';
import Dinero from 'dinero.js';
import { calculateDiscount } from './discount.utils';

const Money = Dinero;
Money.defaultCurrency = 'BRL';
Money.defaultPrecision = 2;
export default class Cart {
  items = [];

  add(item) {
    const itemToFind = { product: item.product };
    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }
    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Money({ amount: item.product.price * item.quantity });
      let discount = Money({ amount: 0 });

      if (item.condition) {
        discount = calculateDiscount(
          amount,
          item.quantity,
          item.condition,
          item.product.price,
        );
      }

      return acc.add(amount).subtract(discount);
    }, Money({ amount: 0 }));
  }

  summary() {
    const total = this.getTotal();
    const items = this.items;
    const formatted = total.toFormat('$0,0.00');

    return {
      items,
      formatted,
      total,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];
    return {
      items,
      total: total.getAmount(),
    };
  }
}
