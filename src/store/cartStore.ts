import { create } from 'zustand';

export interface Weapon {
  id: string;
  name: string;
  type: string;
  category: string;
  price: number;
  priceString: string;
  stats: {
    dmg: number;
    spd: number;
    rng: number;
  };
  image?: string;
  badge?: string;
  inStock: boolean;
  stockCount?: number;
}

export interface CartItem extends Weapon {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (weapon: Weapon) => void;
  removeItem: (id: string) => void;
  toggleCart: () => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (weapon) => set((state) => {
    if (!weapon.inStock) return state;
    const existingItem = state.items.find((i) => i.id === weapon.id);
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === weapon.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    return { items: [...state.items, { ...weapon, quantity: 1 }] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter((i) => i.id !== id),
  })),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    const items = get().items;
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
