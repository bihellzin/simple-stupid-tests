import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'aguinha geladinha',
    price: 35388, // 1.50
  };

  let product2 = {
    title: 'pipoca bokus',
    price: 100, // 1.50
  };

  beforeEach(() => {
    cart = new Cart();
  });

  describe('getTotal()', () => {
    it('should return 0 when getTotal() is excecuted in a newly created cart', () => {
      expect(cart.getTotal().getAmount()).toBe(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2, // 3.00
      });
      expect(cart.getTotal().getAmount()).toBe(70776);
    });

    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2, // 3.00
      });
      cart.add({
        product,
        quantity: 1, // 1.50
      });

      expect(cart.getTotal().getAmount()).toBe(35388);
    });

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2, // 3.00
      });

      cart.add({
        product: product2,
        quantity: 1, // 1.00
      });

      expect(cart.getTotal().getAmount()).toBe(70876);

      cart.remove(product);
      expect(cart.getTotal().getAmount()).toBe(100);
    });
  });

  describe('checkout()', () => {
    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 8,
      });

      cart.add({
        product: product2,
        quantity: 3,
      });

      expect(cart.checkout()).toMatchSnapshot();
    });

    it('should reset the cart when checkout() is called', () => {
      cart.add({
        product: product2,
        quantity: 3,
      });

      cart.checkout();

      expect(cart.getTotal().getAmount()).toEqual(0);
    });
  });

  describe('summary()', () => {
    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 9,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.summary()).toMatchSnapshot();
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0);
    });

    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 9,
      });

      cart.add({
        product: product2,
        quantity: 1,
      });

      expect(cart.summary().formatted).toEqual('R$3,185.92');
    });
  });

  describe('special discount', () => {
    it('should apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 3,
      });

      expect(cart.getTotal().getAmount()).toEqual(74315);
    });

    it('should not apply percentage discount quantity above minimum is passed', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 30,
      });

      expect(cart.getTotal().getAmount()).toEqual(530820);
    });

    it('should apply quantity discount only for even quantities', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 29,
      });

      expect(cart.getTotal().getAmount()).toEqual(530820);
    });

    it('should not apply quantity discount', () => {
      const condition = {
        quantity: 2,
      };

      cart.add({
        product,
        condition,
        quantity: 2,
      });

      expect(cart.getTotal().getAmount()).toEqual(70776);
    });

    it('should receive two or more conditions and determine/apply the biggest one', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(106164);
    });

    it('should receive two or more conditions and determine/apply the biggest one', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      };

      const condition2 = {
        quantity: 2,
      };

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(35388);
    });

    it('should not apply any discount when condition array is empty', () => {
      cart.add({
        product,
        condition: [],
        quantity: 5,
      });

      expect(cart.getTotal().getAmount()).toEqual(176940);
    });
  });
});
