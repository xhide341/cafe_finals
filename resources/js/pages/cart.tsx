import { ReceiptDialog } from '@/components/receipt-dialog';
import { ShopHeader } from '@/components/shop-header';
import { Button } from '@/components/ui/button';
import { CartProvider, useCart } from '@/contexts/cart-context';
import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function CartContent() {
    const [language, setLanguage] = useState<'EN' | 'PH'>('EN');
    const { auth } = usePage<SharedData>().props;
    const {
        items,
        removeItem,
        updateQuantity,
        getTotalItems,
        getSubtotal,
        getTax,
        getTotal,
    } = useCart();
    const [receiptDialogOpen, setReceiptDialogOpen] = useState(false);

    const handleRemoveItem = (productId: number, productName: string) => {
        removeItem(productId);
        toast.error(`${productName} removed from cart`);
    };

    const handleQuantityChange = (
        productId: number,
        currentQuantity: number,
        change: number,
    ) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
            toast.success('Quantity updated');
        }
    };

    const { clearCart } = useCart();

    const handlePlaceOrder = () => {
        if (items.length === 0) return;

        items.forEach((item, idx) => {
            router.post(
                '/orders',
                {
                    product_name: item.product.name,
                    description: item.product.description,
                    product_image: item.product.image,
                    quantity: item.quantity,
                    price: item.product.price,
                    total_amount: (item.product.price * item.quantity).toFixed(
                        2,
                    ),
                    customer_notes: '',
                    ordered_at: new Date().toISOString(),
                },
                {
                    onSuccess: () => {
                        if (idx === items.length - 1) {
                            clearCart();
                            toast.success('Order placed!');
                        }
                    },
                    onError: () => {
                        toast.error('Failed to place order.');
                    },
                },
            );
        });
    };

    // Convert PHP to USD (approximate rate: 1 USD = 56 PHP)
    const convertPrice = (price: number | string) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        if (language === 'EN') {
            return (numPrice / 56).toFixed(2);
        }
        return numPrice.toFixed(2);
    };
    const getCurrencySymbol = () => {
        return language === 'EN' ? '$' : '₱';
    };

    return (
        <>
            <Head title="Shopping Cart - Cafe Rencontre" />
            <div className="flex min-h-screen w-full flex-col bg-background">
                {/* Header */}
                <ShopHeader
                    cafeLogo={'/assets/images/cafe-logo.png'}
                    language={language}
                    setLanguage={setLanguage}
                    getTotalItems={getTotalItems}
                    auth={auth}
                />

                {/* Cart Content */}
                <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
                    <div className="mb-6">
                        <Button variant="link" asChild>
                            <Link href="/shop" className="gap-2">
                                <ArrowLeft className="h-4 w-4" />
                                Back to Shop
                            </Link>
                        </Button>
                    </div>
                    <h1 className="mb-8 font-cursive text-4xl font-bold text-primary">
                        Shopping Cart
                    </h1>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <ShoppingCart className="mb-4 h-24 w-24 text-muted-foreground/50" />
                            <h2 className="mb-2 text-2xl font-bold text-card-foreground">
                                Your cart is empty
                            </h2>
                            <p className="mb-6 text-muted-foreground">
                                Add some delicious coffee to get started!
                            </p>
                            <Button asChild>
                                <Link href="/shop">Browse Products</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="space-y-4 lg:col-span-2">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex gap-4 rounded-lg border bg-card p-4"
                                    >
                                        <img
                                            src={
                                                typeof item.product.image ===
                                                    'string' &&
                                                !item.product.image.startsWith(
                                                    'http',
                                                )
                                                    ? `/assets/images/${item.product.image}`
                                                    : item.product.image
                                            }
                                            alt={item.product.name}
                                            className="h-24 w-24 rounded-md object-cover"
                                        />
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-card-foreground">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {item.product.description}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.product.id,
                                                                item.quantity,
                                                                -1,
                                                            )
                                                        }
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="w-8 text-center font-medium">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item.product.id,
                                                                item.quantity,
                                                                1,
                                                            )
                                                        }
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className="font-bold text-primary">
                                                        {getCurrencySymbol()}
                                                        {convertPrice(
                                                            item.product.price *
                                                                item.quantity,
                                                        )}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 cursor-pointer bg-destructive text-white hover:bg-red-500 hover:text-primary-foreground dark:text-primary hover:dark:bg-red-800"
                                                        onClick={() =>
                                                            handleRemoveItem(
                                                                item.product.id,
                                                                item.product
                                                                    .name,
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24 rounded-lg border bg-card p-6">
                                    <h2 className="mb-4 text-xl font-bold text-card-foreground">
                                        Order Summary
                                    </h2>
                                    <div className="space-y-2 border-b pb-4">
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Subtotal</span>
                                            <span>
                                                {getCurrencySymbol()}
                                                {convertPrice(getSubtotal())}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Tax (12%)</span>
                                            <span>
                                                {getCurrencySymbol()}
                                                {convertPrice(getTax())}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            {getCurrencySymbol()}
                                            {convertPrice(getTotal())}
                                        </span>
                                    </div>
                                    <Button
                                        className="mt-6 w-full"
                                        size="lg"
                                        variant="coffee"
                                        onClick={handlePlaceOrder}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="mt-2 w-full"
                                        asChild
                                    >
                                        <Link href="/shop">
                                            Continue Shopping
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t bg-muted/50 py-6">
                    <div className="px-6 text-center">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Cafe Rencontre.
                            All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>

            <ReceiptDialog
                open={receiptDialogOpen}
                onOpenChange={setReceiptDialogOpen}
            />
        </>
    );
}

export default function Cart() {
    return (
        <CartProvider>
            <CartContent />
        </CartProvider>
    );
}
