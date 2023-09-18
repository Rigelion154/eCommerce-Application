import React, { useState } from 'react';
import applyPromoCode from '../../../core/services/Cart/applyPromoCode';

function PromoCodeForm() {
  const [promo, setPromo] = useState('');

  const handlePromoCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(event.target.value);
  };

  return (
    <div>
      <p>Enter promo</p>
      <input type='text' onChange={handlePromoCodeChange} />
      <button type='button' onClick={() => applyPromoCode(promo)}>
        Apply
      </button>
    </div>
  );
}

export default PromoCodeForm;
