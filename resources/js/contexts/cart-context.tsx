import {
    type CartItem,
    type Product,
    type ProductCustomization,
} from '@/types';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

interface CartContextType {
    items: CartItem[];
    addItem: (
        product: Product,
        quantity?: number,
        customizations?: ProductCustomization,
    ) => void;
    removeItem: (
        productId: number,
        customizations?: ProductCustomization,
    ) => void;
    updateQuantity: (
        productId: number,
        quantity: number,
        customizations?: ProductCustomization,
    ) => void;
    clearCart: () => void;
    getTotalItems: () => number;
    getSubtotal: () => number;
    getTax: () => number;
    getTotal: () => number;
    getItemPrice: (item: CartItem) => number;
    confirmPurchase: (
        product: Product,
        quantity: number,
        customizations?: ProductCustomization,
    ) => CartItem;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'cafe_rencontre_cart';
const TAX_RATE = 0.12; // 12% tax

// Customization pricing
const CUSTOMIZATION_PRICES = {
    size: {
        small: 0,
        medium: 10,
        large: 20,
    },
    sugarLevel: {
        none: 0,
        light: 0,
        regular: 0,
        extra: 0,
    },
    milkOption: {
        none: 0,
        regular: 0,
        oat: 10,
        almond: 10,
    },
    extraShot: 15,
    whippedCream: 10,
    cinnamonPowder: 5,
};

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setItems(parsedCart);
            } catch (error) {
                console.error('Failed to parse cart from localStorage:', error);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [items, isInitialized]);

    // Helper to check if two customizations are identical
    const customizationsMatch = (
        c1?: ProductCustomization,
        c2?: ProductCustomization,
    ): boolean => {
        if (!c1 && !c2) return true;
        if (!c1 || !c2) return false;
        return (
            c1.size === c2.size &&
            c1.temperature === c2.temperature &&
            c1.sugarLevel === c2.sugarLevel &&
            c1.milkOption === c2.milkOption &&
            c1.extraShot === c2.extraShot &&
            c1.whippedCream === c2.whippedCream &&
            c1.cinnamonPowder === c2.cinnamonPowder
        );
    };

    // Calculate price for a single item including customizations
    const getItemPrice = (item: CartItem): number => {
        let price = item.product.price;

        if (item.customizations) {
            price += CUSTOMIZATION_PRICES.size[item.customizations.size];
            price +=
                CUSTOMIZATION_PRICES.milkOption[item.customizations.milkOption];
            if (item.customizations.extraShot) {
                price += CUSTOMIZATION_PRICES.extraShot;
            }
            if (item.customizations.whippedCream) {
                price += CUSTOMIZATION_PRICES.whippedCream;
            }
            if (item.customizations.cinnamonPowder) {
                price += CUSTOMIZATION_PRICES.cinnamonPowder;
            }
        }

        return price;
    };

    const addItem = (
        product: Product,
        quantity: number = 1,
        customizations?: ProductCustomization,
    ) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) =>
                    item.product.id === product.id &&
                    customizationsMatch(item.customizations, customizations),
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.product.id === product.id &&
                    customizationsMatch(item.customizations, customizations)
                        ? { ...item, quantity: item.quantity + quantity }
                        : item,
                );
            }

            return [...currentItems, { product, quantity, customizations }];
        });
    };

    const removeItem = (
        productId: number,
        customizations?: ProductCustomization,
    ) => {
        setItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    !(
                        item.product.id === productId &&
                        customizationsMatch(item.customizations, customizations)
                    ),
            ),
        );
    };

    const updateQuantity = (
        productId: number,
        quantity: number,
        customizations?: ProductCustomization,
    ) => {
        if (quantity <= 0) {
            removeItem(productId, customizations);
            return;
        }

        setItems((currentItems) =>
            currentItems.map((item) =>
                item.product.id === productId &&
                customizationsMatch(item.customizations, customizations)
                    ? { ...item, quantity }
                    : item,
            ),
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotalItems = () => {
        return items.reduce((total, item) => total + item.quantity, 0);
    };

    const getSubtotal = () => {
        return items.reduce((total, item) => {
            const itemPrice = getItemPrice(item);
            return total + itemPrice * item.quantity;
        }, 0);
    };

    const getTax = () => {
        return getSubtotal() * TAX_RATE;
    };

    const getTotal = () => {
        return getSubtotal() + getTax();
    };

    const confirmPurchase = (
        product: Product,
        quantity: number,
        customizations?: ProductCustomization,
    ): CartItem => {
        return { product, quantity, customizations };
    };

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                getTotalItems,
                getSubtotal,
                getTax,
                getTotal,
                getItemPrice,
                confirmPurchase,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
