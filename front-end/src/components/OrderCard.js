import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ id, data, status, price, address }) {
  const { role } = JSON.parse(localStorage.getItem('user'));
  const dia = `${data[8]}${data[9]}`;
  const mes = `${data[5]}${data[6]}`;
  const ano = `${data[0]}${data[1]}${data[2]}${data[3]}`;
  return (
    <Link to={ `/customer/orders/${id}` }>
      <div className="card-container">
        <p data-testid={ `${role}_orders__element-order-id-${id}` }>
          { id }
        </p>
        <p data-testid={ `${role}_orders__element-delivery-status-${id}` }>
          { status }
        </p>
        <p
          data-testid={ `${role}_orders__element-order-date-${id}` }
        >
          { `${dia}/${mes}/${ano}` }
        </p>
        <p data-testid={ `${role}_orders__element-card-price-${id}` }>
          { price.replace('.', ',') }
        </p>
        {
          role === 'seller' ? (
            <span data-testid={ `${role}_orders__element-card-address-${id}` }>
              { address }
            </span>
          ) : null
        }
      </div>
    </Link>
  );
}
export default OrderCard;
OrderCard.propTypes = {
  id: PropTypes.string,
  data: PropTypes.string,
  status: PropTypes.string,
  price: PropTypes.number,
  addrress: PropTypes.string,
}.isRequired;
