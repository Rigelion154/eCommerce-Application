import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SlMagnifier } from 'react-icons/sl';

import styles from './SearchForm.module.css';
import searchProductsByWord from '../../../core/services/searchProductsByWord';
import { MasterData } from '../../../types/product-types';
import handleResize from '../../../core/utils/handleResize';

function SearchForm({
  burger,
  setBurger,
}: {
  burger: boolean;
  setBurger: Dispatch<SetStateAction<boolean>>;
}) {
  const [searchedProducts, setSearchedProducts] = useState('');
  const [products, setProducts] = useState<MasterData[]>([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      searchProductsByWord(searchedProducts)
        .then((res) => {
          setProducts(res);
        })
        .catch(() => {});
    }
  }, [searchedProducts]);

  useEffect(() => {
    handleResize(setIsSmallScreen);
    window.addEventListener('resize', () => handleResize(setIsSmallScreen));
    return () => {
      window.removeEventListener('resize', () => handleResize(setIsSmallScreen));
    };
  }, []);

  return (
    <form className={styles.search__form}>
      <div className={styles.search__container}>
        <input
          className={styles.search__input}
          type='text'
          placeholder='Search from site'
          value={searchedProducts}
          onChange={(e) => setSearchedProducts(e.target.value)}
        />
      </div>
      <button className='button' type='button'>
        <SlMagnifier />
      </button>
      {products.length > 0 && (
        <div className={styles.search_data}>
          {products &&
            products.map((product) => {
              const phoneTypeAttribute = product.masterVariant.attributes.find(
                (attr) => attr.name === 'product_type',
              );
              const productType = phoneTypeAttribute ? phoneTypeAttribute.value : '';

              return (
                <Link
                  key={product.id}
                  to={`/categories/${productType}/${product.key.split('_')[0]}/${product.key}`}
                  onClick={() => {
                    if (isSmallScreen) setBurger(!burger);
                    setProducts([]);
                    setSearchedProducts('');
                  }}
                >
                  {product.name['en-US']}
                </Link>
              );
            })}
        </div>
      )}
    </form>
  );
}

export default SearchForm;
