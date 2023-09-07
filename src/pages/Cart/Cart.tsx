import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/layout/container/Container';
import getCartById from '../../core/services/Cart/getCartById';
import { CartType } from '../../types/cart-types/cart-types';
import CartProductCard from '../../components/ui/CartProductCard/CartProductCard';

function Cart() {
  const [cart, setCart] = useState<CartType>();

  useEffect(() => {
    getCartById()
      .then((res) => setCart(res))
      .catch(() => {});
  }, []);

  return (
    <section>
      <Container>
        {cart && cart.lineItems.length > 0 ? (
          <div>
            {cart.lineItems.map((item) => (
              <CartProductCard lineItem={item} key={item.id} />
            ))}
          </div>
        ) : (
          <div>
            <h3>Card is Empty</h3>
            <Link to='/categories/smartphones'>Go to Smartphones</Link>
            <Link to='/categories/laptops'>Go to Laptops</Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Cart;
