import Cart from './Cart';

describe('Cart', () => {
  let cart;
  let product = {
    title: 'aguinha geladinha',
    price: 150, // 1.50
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
      expect(cart.getTotal()).toBe(0);
    });

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2, // 3.00
      });
      expect(cart.getTotal()).toBe(300);
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

      expect(cart.getTotal()).toBe(150);
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

      expect(cart.getTotal()).toBe(400);

      cart.remove(product);
      expect(cart.getTotal()).toBe(100);
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

      expect(cart.getTotal()).toEqual(0);
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
      expect(cart.getTotal()).toBeGreaterThan(0);
    });
  });
});
