import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { GuestMenuContent } from '@/components/guest-menu-content';
import { ReceiptDialog } from '@/components/receipt-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartProvider, useCart } from '@/contexts/cart-context';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingCart,
    Trash2,
    User,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function CartContent() {
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

    return (
        <>
            <Head title="Shopping Cart - Cafe Rencontre" />
            <div className="flex min-h-screen w-full flex-col bg-background">
                {/* Header */}
                <header className="max-w-8xl sticky top-0 z-50 mx-auto w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                    <div className="flex h-16 items-center justify-between px-6">
                        {/* Logo */}
                        <Link href="/shop" className="flex items-center gap-3">
                            <img
                                src="https://placehold.co/40x40/8B7355/F5F1E8?text=CR"
                                alt="Cafe Logo"
                                className="h-10 w-10 rounded-full border-2 border-primary"
                            />
                            <span className="font-cursive text-xl font-bold text-primary">
                                Cafe Rencontre
                            </span>
                        </Link>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <AppearanceToggleDropdown />

                            {/* Cart */}
                            <Button
                                variant="outline"
                                size="icon"
                                className="relative"
                                asChild
                            >
                                <Link href="/cart">
                                    <ShoppingCart className="h-5 w-5" />
                                    {getTotalItems() > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                                        >
                                            {getTotalItems()}
                                        </Badge>
                                    )}
                                </Link>
                            </Button>

                            {/* Profile Dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-56"
                                >
                                    <GuestMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

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
                                            src={item.product.image}
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
                                                        ₱
                                                        {(
                                                            item.product.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:text-destructive"
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
                                                ₱{getSubtotal().toFixed(2)}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground">
                                            <span>Tax (12%)</span>
                                            <span>₱{getTax().toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between pt-4 text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">
                                            ₱{getTotal().toFixed(2)}
                                        </span>
                                    </div>
                                    <Button
                                        className="mt-6 w-full"
                                        size="lg"
                                        onClick={() =>
                                            setReceiptDialogOpen(true)
                                        }
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
