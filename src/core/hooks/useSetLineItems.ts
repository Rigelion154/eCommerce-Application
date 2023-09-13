import React, { useEffect } from 'react';

import { LineItemType } from '../../types/cart-types/cart-types';

import getCartById from '../services/Cart/getCartById';

export default function useSetLineItems(
  setLineItems: React.Dispatch<React.SetStateAction<LineItemType[]>>,
) {
  useEffect(() => {
    if (localStorage.getItem('cartId')) {
      getCartById()
        .then((res) => {
          setLineItems(res.lineItems);
        })
        .catch(() => {});
    }
  }, [setLineItems]);
}
