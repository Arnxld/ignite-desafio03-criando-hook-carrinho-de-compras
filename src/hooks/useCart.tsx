import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface ProductAPI {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [products, setProducts] = useState<ProductAPI[]>([])
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart')

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  useEffect(() => {
    api.get('http://localhost:3333/products').then(response => {
      setProducts(response.data)
    })
  }, [])

  const addProduct = async (productId: number) => {
    try {
      const foundProduct = cart.find(product => {
        if (product.id === productId) {
          return product
        }
      })

      if (foundProduct) {
        const newCart = cart.map(product => {
          if(product.id === foundProduct.id) {
            product.amount += 1
            return product
          } else {
            return product
          }
        })

      setCart(newCart)
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
      } else {
        const productFromApi = products.find(product => {
          if(product.id === productId) {
            return {
              product,
              amount: 1,
            }
          }
        })

        if(productFromApi) {
          const newCart = [
            ...cart,
            productFromApi
          ]

          setCart(newCart)
          localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart))
        }
      }
    }
  
    catch {
      // TODO
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
