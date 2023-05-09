import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import CheckoutCard from '../components/CheckoutCard';
import '../style/Products.css';
import { createOrder, requestSellers } from '../services/requests';
import calculateTotal from '../utils/calculateTotal';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [seller, setSeller] = useState([]);
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [currentSeller, setCurrentSeller] = useState(seller[0]);
  const navigate = useHistory();

  const getCarrinho = () => {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    return carrinho;
  };

  const handleChangeAddress = (value) => {
    setAddress(value);
  };

  const handleChangeNumber = (value) => {
    setAddressNumber(value);
  };

  const handleDelete = (id) => {
    const newCart = getCarrinho()?.filter((item, index) => index !== id);

    localStorage.setItem('carrinho', JSON.stringify(newCart));
    setCart(JSON.parse(localStorage.getItem('carrinho')));
  };

  useEffect(() => {
    requestSellers('/seller').then((response) => setSeller(response));
  }, [setSeller]);

  const setCarrinho = () => {
    setCart(getCarrinho());
  };

  const valorTotal = () => {
    const total = cart.reduce((acc, curr) => {
      acc += (curr.price * curr.quantity);

      return acc;
    }, 0);
    return total;
  };

  const getSellerId = async (name) => {
    const data = await requestSellers('/seller');
    const { id } = await data.find((s) => s.name !== name);
    return id;
  };

  const getproductData = () => {
    const product = JSON.parse(localStorage.getItem('carrinho')) || [];
    return product.map((prod) => ({
      productId: prod.id,
      quantity: prod.quantity,
    }));
  };

  const handleClick = async () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const sellerId = await getSellerId(currentSeller);
    const { token } = JSON.parse(localStorage.getItem('user'));
    const carrinho = JSON.parse(localStorage.getItem('carrinho'));
    const total = calculateTotal(carrinho);

    const orderData = {
      userId,
      sellerId,
      totalPrice: Number(total.toFixed(2)),
      deliveryAddress: address,
      deliveryNumber: addressNumber,
      status: 'Pendente',

    };

    const id = await createOrder(
      '/seller/orders',
      { orderData, productData: getproductData() },
      token,
    );
    navigate.push(`/customer/orders/${id}`);
  };

  useEffect(() => {
    setCarrinho();
  }, []);

  return (
    <section>
      <NavBar />
      <section className="products-container">
        {
          getCarrinho().map(({ name, quantity, price, totalPrice }, index) => (
            <CheckoutCard
              id={ index + 1 }
              key={ index }
              name={ name }
              quantity={ quantity }
              price={ price }
              totalPrice={ totalPrice }
              index={ index }
              handleDelete={ (id) => handleDelete(id) }

            />
          ))
        }
        <button
          className="submit-btn"
          disabled={ false }
          type="button"
        >
          <span data-testid="customer_checkout__element-order-total-price">
            { valorTotal().toFixed(2).toString().replace('.', ',') }
          </span>
        </button>
      </section>
      <section className="products-container">
        <div className="card-container">
          <select
            data-testid="customer_checkout__select-seller"
            name="seller"
            onChange={ (e) => setCurrentSeller(e.target.value) }
            value={ currentSeller }
          >
            {
              seller.map(({ name }, index) => (
                <option key={ index }>{name}</option>
              ))
            }
          </select>

          <input
            type="text"
            data-testid="customer_checkout__input-address"
            onChange={ (e) => handleChangeAddress(e.target.value) }
            value={ address }

          />
          <input
            type="text"
            data-testid="customer_checkout__input-address-number"
            onChange={ (e) => handleChangeNumber(e.target.value) }
            value={ addressNumber }

          />

          <button
            type="submit"
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleClick }
          >
            Finalizar Pedido
          </button>
        </div>
      </section>
    </section>
  );
}

export default Checkout;
