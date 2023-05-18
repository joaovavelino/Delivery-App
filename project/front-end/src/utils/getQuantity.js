const getQuantity = () => {
  if (localStorage.getItem('carrinho')) {
    return JSON.parse(localStorage.getItem('carrinho'));
  }
  return [];
};

export default getQuantity;
