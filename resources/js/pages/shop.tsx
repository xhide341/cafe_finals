import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { GuestMenuContent } from '@/components/guest-menu-content';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartProvider, useCart } from '@/contexts/cart-context';
import { type Product, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

function ShopContent() {
    const { auth } = usePage<SharedData>().props;
    const [language, setLanguage] = useState<'EN' | 'PH'>('EN');
    const { addItem, getTotalItems } = useCart();

    // Coffee products from menu
    const products: Product[] = [
        // Hot Coffee
        {
            id: 1,
            name: 'Spanish Latte',
            description: 'hot, creamy',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Spanish+Latte',
        },
        {
            id: 2,
            name: 'Macchiato',
            description: 'hot, espresso',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Macchiato',
        },
        {
            id: 3,
            name: 'Hazelnut Latte',
            description: 'hot, nutty',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Hazelnut',
        },
        {
            id: 4,
            name: 'Americano',
            description: 'hot, bold',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Americano',
        },
        {
            id: 5,
            name: 'Caramel Macchiato',
            description: 'hot, sweet',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Caramel',
        },
        {
            id: 6,
            name: 'Vanilla Latte',
            description: 'hot, smooth',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Vanilla',
        },
        // Iced Coffee
        {
            id: 7,
            name: 'Iced Spanish Latte',
            description: 'iced, creamy',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Iced+Spanish',
        },
        {
            id: 8,
            name: 'Iced Macchiato',
            description: 'iced, espresso',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Iced+Macchiato',
        },
        {
            id: 9,
            name: 'Iced Hazelnut Latte',
            description: 'iced, nutty',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Iced+Hazelnut',
        },
        {
            id: 10,
            name: 'Iced Americano',
            description: 'iced, bold',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Iced+Americano',
        },
        {
            id: 11,
            name: 'Iced Caramel Macchiato',
            description: 'iced, sweet',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Iced+Caramel',
        },
        {
            id: 12,
            name: 'Iced Vanilla Latte',
            description: 'iced, smooth',
            price: 49,
            image: 'https://placehold.co/400x400/8B7355/F5F1E8?text=Iced+Vanilla',
        },
    ];

    const handleAddToCart = (product: Product) => {
        addItem(product, 1);
        toast.success(`${product.name} added to cart!`);
    };

    // Convert PHP to USD (approximate rate: 1 USD = 56 PHP)
    const convertPrice = (price: number) => {
        if (language === 'EN') {
            return (price / 56).toFixed(2);
        }
        return price.toFixed(2);
    };

    const getCurrencySymbol = () => {
        return language === 'EN' ? '$' : '₱';
    };

    return (
        <>
            <Head title="Coffee Shop - Cafe Rencontre" />
            <div className="min-h-screen w-full bg-background">
                {/* Header */}
                <header className="max-w-8xl sticky top-0 z-50 mx-auto w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                    <div className="flex h-16 items-center justify-between px-6">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <img
                                src="https://placehold.co/40x40/8B7355/F5F1E8?text=CR"
                                alt="Cafe Logo"
                                className="h-10 w-10 rounded-full border-2 border-primary"
                            />
                            <span className="font-cursive text-xl font-bold text-coffee-primary">
                                Cafe Rencontre
                            </span>
                        </Link>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-4">
                            {/* Theme Toggle */}
                            <AppearanceToggleDropdown />

                            {/* Language Selector */}
                            <div className="flex items-center gap-1 rounded-lg border bg-muted p-1">
                                <Button
                                    variant={
                                        language === 'EN' ? 'default' : 'ghost'
                                    }
                                    size="sm"
                                    onClick={() => setLanguage('EN')}
                                    disabled={language === 'EN'}
                                    className="h-8 px-3"
                                >
                                    EN
                                </Button>
                                <Button
                                    variant={
                                        language === 'PH' ? 'default' : 'ghost'
                                    }
                                    size="sm"
                                    onClick={() => setLanguage('PH')}
                                    disabled={language === 'PH'}
                                    className="h-8 px-3"
                                >
                                    PH
                                </Button>
                            </div>

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

                {/* Hero Section */}
                <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12">
                    <div className="px-6">
                        <div className="space-y-4 text-center">
                            <h1 className="font-cursive text-4xl font-bold text-coffee-primary md:text-6xl">
                                Our Coffee Collection
                            </h1>
                            <p className="mx-auto max-w-2xl font-poppins text-lg text-muted-foreground">
                                Discover our handcrafted coffee beverages, made
                                with love and the finest beans from around the
                                world
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products Grid */}
                <section className="py-12">
                    <div className="px-6">
                        <div className="mx-auto grid max-w-[1860px] grid-cols-1 gap-0 md:grid-cols-2 xl:grid-cols-3">
                            {products.map((product) => (
                                <div
                                    key={product.id}
                                    className="group mx-2.5 my-5 w-full max-w-[600px] cursor-pointer overflow-hidden bg-card transition-transform"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    {/* Product Image - Maintains aspect ratio */}
                                    <div className="aspect-[600/756] w-full overflow-hidden bg-muted">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="w-full space-y-3 py-4">
                                        <div className="flex items-start justify-between gap-4 md:gap-8 lg:gap-12">
                                            {/* Left side: Title and Description */}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-2xl leading-tight font-extrabold text-card-foreground select-none">
                                                    {product.name}
                                                </h3>
                                                <p className="ml-0.2 mt-1 line-clamp-2 font-poppins text-lg leading-tight font-medium text-muted-foreground lowercase select-none">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Right side: Price */}
                                            <div className="relative flex-shrink-0 self-end">
                                                <span className="relative z-10 text-lg font-bold whitespace-nowrap text-primary select-none">
                                                    {getCurrencySymbol()}
                                                    {convertPrice(
                                                        product.price,
                                                    )}
                                                </span>
                                                {/* Slider animation under price */}
                                                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

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
        </>
    );
}

export default function Shop() {
    return (
        <CartProvider>
            <ShopContent />
        </CartProvider>
    );
}
