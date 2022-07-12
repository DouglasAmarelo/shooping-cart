import { Stack, Button } from 'react-bootstrap';

import { useShoppingCart } from '../context/ShoppingCartContext';

import formatCurrency from '../utils/formatCurrency';

import products from '../data/products.json';

type CardItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CardItemProps) => {
  const { removeProductFromCart } = useShoppingCart();
  const product = products.find(currentProduct => currentProduct.id === id);

  if (!product) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={product.imgUrl}
        width="125px"
        height="75px"
        style={{ objectFit: 'cover' }}
      />

      <div className="me-auto">
        <div>
          {product.name}{' '}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(product.price)}
        </div>
      </div>

      <div>{formatCurrency(product.price * quantity)}</div>

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeProductFromCart(product.id)}
      >
        &times;
      </Button>
    </Stack>
  );
};

export default CartItem;
