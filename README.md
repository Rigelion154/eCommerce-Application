# eCommerce-Application

Link: [https://last-sprint.netlify.app/](https://last-sprint.netlify.app/)

### Development team: [Anton](https://github.com/AntonLeshkovich), [Ilya](https://github.com/rigelion154), [Vladislav](https://github.com/v154254)

## About eCommerce Application
The project is developed using [React](https://react.dev/). It is an application designed for purchasing goods, utilizing CommerceTools to create an API client. The project includes registration and authentication using JWT tokens. All product information is obtained through a REST API. Each client has a separate shopping cart, and there is an option to apply a promo code in the cart. Additionally, a 10% discount, obtained through an API, is applied to products that cost more than $500.

The project implements an infinite scroll feature to display the products. Users can also search and filter products based on attributes, price, and name. A global search function is implemented to search for products by name.  
## Stack
* React
* TypeScript
* CSS
* REST API
* axios
* Prettier
* Husky
* Jest
* Eslint
* Commercetools
## Install and usage project

1. Clone the repository

```js
git clone https://github.com/Rigelion154/eCommerce-Application.git
```

2. Сhange directory

```js
cd eCommerce-Application
```

3. Change branch

```js
git checkout develop
```

4. Install NPM packages

```js
npm install
```

5. Usage

```js
npm run start
```

6. Run ESLint

```js
npm run lint
```

7. Run Prettier

```js
npm run format
```

8. Run tests (used by Jest)

```js
npm run test
```

9. Run Husky

```js
npm run prepare
```
