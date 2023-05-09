const calculateTotal = (cart) => {
  if (cart) {
    const soma = cart.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    return soma;
  }
  return 0;
};

export default calculateTotal;
