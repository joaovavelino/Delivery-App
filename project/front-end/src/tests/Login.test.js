import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import renderWithRouter from './RenderWithRouter';
import Login from '../pages/Login';
import UserProvider from "../context/UserProvider";

describe('Testando login', () => {

  it('Testa se tem input para email', () => {
    renderWithRouter(
    <UserProvider>
      <Login />
      </UserProvider>
      );

    const emailInput = screen.getByRole('textbox', {
      name: /email/i
    });

    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se tem input para senha', () => {
    renderWithRouter(
    <UserProvider>
      <Login />
      </UserProvider>
      );
      
    const passInput = screen.getByLabelText(/password/i)

    expect(passInput).toBeInTheDocument();
  });

  it('Testa se tem botão para fazer login', () => {
    renderWithRouter(
    <UserProvider>
      <Login />
      </UserProvider>
      );
      
    const loginBtn = screen.getByRole('button', {
      name: /entrar/i
    })

    expect(loginBtn).toBeInTheDocument();
  });

  it('Testa se tem botão para fazer login', () => {
    renderWithRouter(
    <UserProvider>
      <Login />
      </UserProvider>
      );
      
    const registerBtn = screen.getByRole('button', {
      name: /sign in/i
    })

    expect(registerBtn).toBeInTheDocument();
  });

  it('Testa se é possível realizar cadastro', () => {
    renderWithRouter(
    <UserProvider>
      <Login />
      </UserProvider>
      );
      
    const registerBtn = screen.getByRole('button', {
      name: /sign in/i
    })

    userEvent.click(registerBtn);

  });
});