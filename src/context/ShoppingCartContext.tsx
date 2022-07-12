import { createContext, ReactNode, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartProductProps = {
  id: number;
  quantity: number;
};

type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getProductQuantity: (id: number) => number;
  increaseProductQuantity: (id: number) => void;
  decreaseProductQuantity: (id: number) => void;
  removeProductFromCart: (id: number) => void;
  cartQuantity: number;
  cardProducts: CartProductProps[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export const useShoppingCart = () => useContext(ShoppingCartContext);

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cardProducts, setCardProducts] = useLocalStorage<CartProductProps[]>(
    'shopping-cart',
    []
  );

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const getProductQuantity = (id: number) => {
    const findedProduct = cardProducts.find(product => product.id === id);

    return findedProduct?.quantity || 0;
  };

  const increaseProductQuantity = (id: number) => {
    setCardProducts(currentProducts => {
      const productExists = currentProducts.find(product => product.id === id);

      if (productExists) {
        return currentProducts.map(product => {
          return product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        });
      }

      return [...currentProducts, { id, quantity: 1 }];
    });
  };

  const decreaseProductQuantity = (id: number) => {
    setCardProducts(currentProducts => {
      const hasOnlyOneProduct =
        currentProducts.find(product => product.id === id)?.quantity === 1;

      if (hasOnlyOneProduct) {
        return currentProducts.filter(product => product.id !== id);
      }

      return currentProducts.map(product => {
        return product.id === id
          ? { ...product, quantity: product.quantity - 1 }
          : product;
      });
    });
  };

  const removeProductFromCart = (id: number) => {
    setCardProducts(currentProducts => {
      return currentProducts.filter(product => product.id !== id);
    });
  };

  const cartQuantity = cardProducts.reduce(
    (total, product) => product.quantity + total,
    0
  );

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getProductQuantity,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeProductFromCart,
        cardProducts,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
