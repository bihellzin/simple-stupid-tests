import Dinero from 'dinero.js';
const Money = Dinero;

const percentage = (quantity, price) => {
  return quantity % 2 === 0
    ? 50
    : 100 - (((quantity + 1) * price * 0.5) / (quantity * price)) * 100;
};

export const calculateDiscount = (amount, quantity, condition, price) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] =
    list.length > 0
      ? list
          .map(discountCondition => {
            if (discountCondition.percentage) {
              return calculatePercentageDiscount(amount, {
                condition: discountCondition,
                quantity,
              }).getAmount();
            }

            return calculateQuantityDiscount(
              amount,
              {
                condition: discountCondition,
                quantity,
              },
              price,
            ).getAmount();
          })
          .sort((a, b) => b - a)
      : [0];

  return Money({ amount: higherDiscount });
};

const calculatePercentageDiscount = (amount, { condition, quantity }) => {
  if (condition?.percentage && quantity > condition.minimum) {
    return amount.percentage(condition.percentage);
  }

  return Money({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item, price) => {
  if (item.condition?.quantity && item.quantity > item.condition.quantity) {
    const p = percentage(item.quantity, price);
    return amount.percentage(p);
  }

  return Money({ amount: 0 });
};
