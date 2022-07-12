import { Offcanvas, Stack } from 'react-bootstrap';

import CartItem from './CartItem';

import { useShoppingCart } from '../context/ShoppingCartContext';

import formatCurrency from '../utils/formatCurrency';

import products from '../data/products.json';

type ShoppingCartProps = {
  isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cardProducts } = useShoppingCart();

  const totalCart = cardProducts.reduce((total, currentCartProduct) => {
    const product = products.find(
      currentProduct => currentProduct.id === currentCartProduct.id
    );

    return total + (product?.price || 0) * currentCartProduct.quantity;
  }, 0);

  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Stack gap={3}>
          {cardProducts.map(product => (
            <CartItem key={product.id} {...product} />
          ))}

          <div className="ms-auto fw-bold fs-5">
            Total: {formatCurrency(totalCart)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingCart;
