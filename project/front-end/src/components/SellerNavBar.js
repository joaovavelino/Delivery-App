import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

function SellerNavBar({ user }) {
  const navigation = useHistory();
  const handleOnLogout = () => {
    localStorage.removeItem('user');
    navigation.push('/');
  };
  return (
    <nav>
      <Link
        data-testid="customer_products__element-navbar-link-orders"
        to="/customer/products"
      >
        Produtos
      </Link>
      <span
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { user || JSON.parse(localStorage.getItem('user')).name }
      </span>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleOnLogout }
      >
        Sair
      </button>
    </nav>
  );
}
export default SellerNavBar;
SellerNavBar.propTypes = {
  user: PropTypes.string,
}.isRequired;
