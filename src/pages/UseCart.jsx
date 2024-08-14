import { useState, useEffect } from "react";

const UseCart = () => {
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem("cart");
    try {
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    console.log("Cart updated:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id && item.store_name === product.store_name
    );

    if (existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const removeFromCart = (id, store_name) => {
    setCart(
      cart.filter((item) => !(item.id === id && item.store_name === store_name))
    );
  };

  const updateQuantity = (id, store_name, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id, store_name);
    } else {
      setCart(
        cart.map((item) =>
          item.id === id && item.store_name === store_name
            ? { ...item, quantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  const getTotalPriceForStore = (store_name) => {
    return cart
      .filter((item) => item.store_name === store_name)
      .reduce((total, item) => total + item.price * (item.quantity || 0), 0);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalItems,
    getTotalPriceForStore,
  };
};

export default UseCart;
