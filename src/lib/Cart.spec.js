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
