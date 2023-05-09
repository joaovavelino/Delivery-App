import React, { /* useContext,  */useState } from 'react';
import GenericInput from '../components/GenericInput';
import AdmNavbar from '../components/AdmNavbar';
import Button from '../components/Button';
import { registerValidations } from '../utils/validations';
import '../style/Login.css';
import { admRequestRegister } from '../services/requests';

function Manage() {
  const [errorRequisiton, setErrorRequisition] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await admRequestRegister({ name, email, password, role: role || 'customer' });
    } catch ({ response }) {
      setErrorMessage(response.data.message);
      setErrorRequisition(true);
    }
  };

  return (
    <section className="wrapper">
      <AdmNavbar user={ JSON.parse(localStorage.getItem('user')).name } />
      <section className="user-login-area">
        <img alt="Trybe Delivery App" />
        <form className="form">
          <h1>Cadastrar novo usuário</h1>
          <GenericInput
            testid="admin_manage__input-name"
            type="text"
            selector="name"
            fieldName="Name"
            placeholder="Nome e sobrenome"
            setter={ setName }
          />
          <GenericInput
            testid="admin_manage__input-email"
            type="email"
            selector="email"
            fieldName="Email"
            placeholder="dgite seu email"
            setter={ setEmail }
          />
          <GenericInput
            testid="admin_manage__input-password"
            type="password"
            selector="password"
            fieldName="Password"
            placeholder="******"
            setter={ setPassword }
          />

          Tipo
          <select
            data-testid="admin_manage__select-role"
            name="role"
            onChange={ (e) => setRole(e.target.value) }
            value={ role }

          >
            <option value=""> </option>
            <option value="seller">Seller</option>
          </select>

          {errorRequisiton && (
            <span
              data-testid="admin_manage__element-invalid-register"
            >
              {errorMessage}
            </span>
          )}
          <Button
            testid="admin_manage__button-register"
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

export default Manage;
