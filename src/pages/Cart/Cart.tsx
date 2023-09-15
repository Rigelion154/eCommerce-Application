import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CartType } from '../../types/cart-types/cart-types';

import deleteCart from '../../core/services/testCart/deleteCart';
import getCartById from '../../core/services/Cart/getCartById';

import Container from '../../components/layout/container/Container';
import CartProductCard from '../../components/ui/CartProductCard/CartProductCard';

import styles from './Cart.module.css';
import addDiscountCart from '../../core/services/Cart/discountCart/addDiscountCart';

function Cart() {
  const [cart, setCart] = useState<CartType>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promo, setPromo] = useState('');
  const [oldPrice, setOldPrice] = useState(0);

  const getTotalPrice = useCallback((newCart: CartType) => {
    setTotalPrice(newCart.totalPrice.centAmount);
    setCart(newCart);
  }, []);

  useEffect(() => {
    getCartById()
      .then((res) => {
        setCart(res);
        setTotalPrice(res.totalPrice.centAmount);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (cart && cart.discountCodes && cart.discountCodes.length > 0) {
      setOldPrice((totalPrice / 100) * (1 / 0.95));
    }
  }, [cart, totalPrice]);

  // console.log(cart);
  return (
    <section>
      <Container>
        {cart && cart.lineItems && cart.lineItems.length > 0 ? (
          <div className={styles.wrapper}>
            {cart.lineItems.map((item) => (
              <CartProductCard lineItem={item} key={item.id} getTotalPrice={getTotalPrice} />
            ))}
            <div className={styles.footer__wrapper}>
              <div>
                <h5>Have a promo code?</h5>
                <div className={styles.promo__wrapper}>
                  <input
                    className={styles.promo__input}
                    type='text'
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                  />
                  <button
                    className={styles.button_clear}
                    type='button'
                    onClick={() => {
                      if (cart.discountCodes && cart.discountCodes.length === 0) {
                        addDiscountCart(promo)
                          .then((res) => {
                            setTotalPrice(res.totalPrice.centAmount);
                            setOldPrice((res.totalPrice.centAmount / 100) * (1 / 0.95));
                            setPromoError('');
                            setPromo('');
                          })
                          .catch(() => setPromoError('Invalid promo'));
                      }
                    }}
                  >
                    Apply
                  </button>
                  {promoError && <span className={styles.promo__error}>{promoError}</span>}
                </div>
              </div>
              <div className={styles.footer__price}>
                <button
                  className={styles.button_clear}
                  type='button'
                  onClick={() => {
                    getCartById()
                      .then((res) => {
                        deleteCart(res.id, res.version)
                          .then(() => {
                            setCart(undefined);
                            localStorage.setItem('cartId', '');
                          })
                          .catch(() => {});
                      })
                      .catch(() => {});
                  }}
                >
                  Clear cart
                </button>
                <div className={styles.total__wrapper}>
                  <span>Total:</span>
                  {!!oldPrice && (
                    <span className={oldPrice ? styles.total__after_discount : ''}>
                      {oldPrice.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </span>
                  )}
                  <span className={oldPrice ? styles.total__new : ''}>
                    {(totalPrice / 100).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.empty__wrapper}>
            <div className={styles.empty__description}>
              <h3>Card is Empty</h3>
              <div>
                <span>Go to </span>
                <Link className={styles.empty_link} to='/categories/smartphones'>
                  Smartphones
                </Link>
              </div>
              <div>
                <span>Go to </span>
                <Link className={styles.empty_link} to='/categories/laptops'>
                  Laptops
                </Link>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export default Cart;
