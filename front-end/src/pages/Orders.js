import React, { useContext, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import UserContext from '../context/UserContext';
import '../style/Products.css';
import SellerNavBar from '../components/SellerNavBar';
import { requestData } from '../services/requests';

function Orders() {
  const { orders, setOrders } = useContext(UserContext);

  const getOrders = async () => {
    const token = localStorage.getItem('token');
    requestData('/seller/orders', token).then((response) => setOrders(response));
  };

  useEffect(() => {
    getOrders();
    console.log(orders);
  }, [setOrders]);

  return (
    <section>
      <SellerNavBar user={ JSON.parse(localStorage.getItem('user')).name } />
      <section className="products-container">
        {
          orders.length > 0 ? (
            orders.map((p) => (
              <OrderCard
                key={ p.id }
                id={ p.id }
                data={ p.saleDate }
                status={ p.status }
                price={ p.totalPrice }
                address={ p.deliveryAddress }
              />
            ))
          ) : null
        }
      </section>
    </section>
  );
}
export default Orders;
