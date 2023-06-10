import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import GenericInput from '../components/GenericInput';
import Button from '../components/Button';
import UserContext from '../context/UserContext';
import { registerValidations } from '../utils/validations';
import '../style/Login.css';
import { requestLogin, requestRegister } from '../services/requests';

function Register() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName } = useContext(UserContext);
  const [errorRequisiton, setErrorRequisition] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useHistory();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await requestRegister({ name, email, password });
      const data = await requestLogin('/login', { email, password });

      localStorage.setItem('user', JSON.stringify(data));
      navigate.push('/customer/products');
    } catch ({ response }) {
      setErrorMessage(response.data.message);
      setErrorRequisition(true);
    }
  };

  return (
    <section className="wrapper">
      <section className="user-login-area">
        <img alt="Delivery App" />
        <form className="form">
          <h1>Cadastro</h1>
          <GenericInput
            testid="common_register__input-name"
            type="text"
            selector="name"
            fieldName="Name"
            placeholder="Seu nome"
            setter={ setName }
          />
          <GenericInput
            testid="common_register__input-email"
            type="email"
            selector="email"
            fieldName="Email"
            placeholder="dgite seu email"
            setter={ setEmail }
          />
          <GenericInput
            testid="common_register__input-password"
            type="password"
            selector="password"
            fieldName="Password"
            placeholder="******"
            setter={ setPassword }
          />
          {errorRequisiton && (
            <span
              data-testid="common_register__element-invalid_register"
            >
              {errorMessage}
            </span>
          )}
          <Button
            testid="common_register__button-register"
            btnName="Cadastrar"
            type="submit"
            onClick={ handleOnSubmit }
            isDisable={ registerValidations(email, password, name) }
          />
        </form>
      </section>
    </section>
  );
}

export default Register;
