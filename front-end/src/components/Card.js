import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import calculateTotal from '../utils/calculateTotal';
import Button from './Button';

function Card({ url, alt, id, name, price, total, product }) {
  const [quantity, setQuantity] = useState(product.quantity || 0);

  const handleClick = (value) => {
    if (value === '+') {
      setQuantity(quantity + 1);
    }
    if (value === '-' && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (value) => {
    setQuantity(value);
  };

  const createCart = () => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinho) {
      const exists = carrinho.some((prod) => prod.name === name);
      if (exists) {
        carrinho = carrinho.reduce((acc, curr) => {
          if (curr.name === name) {
            curr.quantity = quantity;
            return acc;
          }
          return acc;
        }, carrinho);
      } else {
        carrinho = [
          ...carrinho,
          { name, price, quantity, id },
        ];
      }
      const updatedCart = carrinho.filter((prod) => prod.quantity);
      localStorage.setItem('carrinho', JSON.stringify(updatedCart));
      total(calculateTotal(updatedCart));
    } else {
      localStorage.setItem(
        'carrinho',
        JSON.stringify([{ name, price, quantity }]),
      );
      total(calculateTotal([{ name, price, quantity }]));
    }
  };

  useEffect(() => {
    createCart();
  }, [quantity]);

  return (
    <div className="card-container">
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        { price.replace('.', ',') }
      </p>

      <figure>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          width="60%"
          height="200px"
          src={ url }
          alt={ alt }
        />
      </figure>

      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        { name }
      </p>

      <Button
        className="submit-btn"
        onClick={ (e) => handleClick(e.target.value) }
        type="button"
        value="+"
        testid={ `customer_products__button-card-add-item-${id}` }
      />

      <input
        type="text"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ (e) => handleChange(e.target.value) }
        value={ quantity }
      />

      <Button
        className="submit-btn"
        onClick={ (e) => handleClick(e.target.value) }
        type="button"
        value="-"
        testid={ `customer_products__button-card-rm-item-${id}` }
      />
    </div>
  );
}

export default Card;

Card.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  url: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
}.isRequired;
