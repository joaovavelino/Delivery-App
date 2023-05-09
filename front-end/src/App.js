import { Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProvider from './context/UserProvider';
import Products from './pages/Products';
import Manage from './pages/Manage';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import OrderDetail from './pages/OrderDetail';

function App() {
  return (
    <Switch>
      <UserProvider>
        <Route exact path="/" render={ () => <Redirect to="/login" /> } />
        <Route path="/customer/products" component={ Products } />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <Route path="/admin/manage" component={ Manage } />
        <Route path="/seller/orders" component={ Orders } />
        <Route path="/customer/orders" component={ Orders } />
        <Route path="/customer/orders/:saleId" component={ OrderDetail } />
        <Route path="/customer/checkout" component={ Checkout } />
      </UserProvider>

    </Switch>

  );
}

export default App;
