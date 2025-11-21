"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  length?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartState };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.payload.id);

      const items = existing
        ? state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...action.payload, quantity: 1 }];

      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }

    case "REMOVE_ITEM": {
      const items = state.items.filter((i) => i.id !== action.payload);

      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const items = state.items
        .map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        )
        .filter((i) => i.quantity > 0);

      return {
        items,
        total: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    }

    case "CLEAR_CART":
      return { items: [], total: 0 };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  // HYDRATE FROM LOCALSTORAGE
  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        const parsed: CartState = JSON.parse(saved);
        dispatch({ type: "HYDRATE", payload: parsed });
      } catch {
        console.error("Failed to parse cart data");
      }
    }
  }, []);

  // SAVE TO LOCALSTORAGE WHENEVER STATE CHANGES
  useEffect(() => {
    if (state.items.length === 0 && state.total === 0) return; // don't overwrite with empty on first mount
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  // EXPOSED ACTIONS
  const addItem = (item: Omit<CartItem, "quantity">) =>
    dispatch({ type: "ADD_ITEM", payload: item });

  const removeItem = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const updateQuantity = (id: number, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total: state.total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
