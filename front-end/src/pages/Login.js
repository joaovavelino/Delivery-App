import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GenericInput from '../components/GenericInput';
import RegisterBtn from '../components/RegisterBtn';
import Button from '../components/Button';
import UserContext from '../context/UserContext';
import '../style/Login.css';
import { loginValidations } from '../utils/validations';
import { requestLogin } from '../services/requests';

function Login() {
  const { email, setEmail, password, setPassword } = useContext(UserContext);
  const [errorRequisiton, setErrorRequisition] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useHistory();
  function navigateFunction(value) {
    navigate.push(value);
  }
  console.log(email);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await requestLogin('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role === 'administrator') {
        navigateFunction('/admin/manage');
      } else if (data.role === 'seller') {
        navigateFunction('/seller/orders');
      } else {
        navigateFunction('/customer/products');
      }
    } catch ({ response }) {
      setErrorMessage(response.data.message);
      setErrorRequisition(true);
    }
  };
  useEffect(() => {
    const redirect = () => {
      const data = JSON.parse(localStorage.getItem('user'));
      if (data) {
        if (data.role === 'administrator') {
          navigate.push('/admin/manage');
        } else if (data.role === 'seller') {
          navigate.push('/seller/orders');
        } else if (data.role === 'customer') {
          navigate.push('/customer/products');
        }
      }
    };
    redirect();
  }, [navigate]);
  return (
    <section className="wrapper">
      <section className="user-login-area">
        <img alt="Delivery App" />
        <form className="form">
          <h1>App Delivery</h1>
          <GenericInput
            testid="common_login__input-email"
            type="email"
            selector="email"
            fieldName="Email"
            placeholder="dgite seu email"
            setter={ setEmail }
          />
          <GenericInput
            testid="common_login__input-password"
            type="password"
            selector="password"
            fieldName="Password"
            placeholder="********"
            setter={ setPassword }
          />
          <Button
            testid="common_login__button-login"
            type="submit"
            btnName="Entrar"
            onClick={ handleSubmit }
            isDisable={ loginValidations(email, password) }
          />
          {errorRequisiton && (
            <span data-testid="common_login__element-invalid-email">{errorMessage}</span>
          )}
          <RegisterBtn
            testid="common_login__button-register"
          />
        </form>
      </section>
    </section>
  );
}
export default Login;
