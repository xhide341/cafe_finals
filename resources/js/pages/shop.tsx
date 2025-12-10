import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { GuestMenuContent } from '@/components/guest-menu-content';
import { ProductDetailsSheet } from '@/components/product-details-sheet';
import { ReceiptDialog } from '@/components/receipt-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CartProvider, useCart } from '@/contexts/cart-context';
import {
    type CartItem,
    type Product,
    type ProductCustomization,
    type SharedData,
} from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShoppingCart, User } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import cafeLogo from '../../assets/images/cafe-logo.png';
import { ShopHeader } from '@/components/shop-header';

// Import coffee images

function ShopContent() {
    const { auth } = usePage<SharedData>().props;
    const [language, setLanguage] = useState<'EN' | 'PH'>('EN');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [sheetOpen, setSheetOpen] = useState(false);
    const [receiptOpen, setReceiptOpen] = useState(false);
    const [singlePurchaseItem, setSinglePurchaseItem] =
        useState<CartItem | null>(null);
    const { addItem, getTotalItems, confirmPurchase } = useCart();

    // Products from backend
    const { products: rawProducts } = usePage<SharedData>().props;
    const products: Product[] = Array.isArray(rawProducts) ? rawProducts : [];

    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setSheetOpen(true);
    };

    const handleAddToCart = (
        product: Product,
        quantity: number,
        customizations: ProductCustomization,
    ) => {
        toast.success(`${product.name} added to cart!`);
    };

    const handleConfirmPurchase = (
        product: Product,
        quantity: number,
        customizations: ProductCustomization,
    ) => {
        const purchaseItem = confirmPurchase(product, quantity, customizations);
        setSinglePurchaseItem(purchaseItem);
        setSheetOpen(false);
        setReceiptOpen(true);
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
            <Head title="Coffee Shop - Cafe Rencontre" />
            <div className="min-h-screen w-full bg-background">
                {/* Header */}
                <ShopHeader
                    cafeLogo={cafeLogo}
                    language={language}
                    setLanguage={setLanguage}
                    getTotalItems={getTotalItems}
                    auth={auth}
                />

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
                                    onClick={() => handleProductClick(product)}
                                >
                                    {/* Product Image - Maintains aspect ratio */}
                                    <div className="aspect-[600/756] w-full overflow-hidden bg-muted">
                                        <img
                                            src={
                                                typeof product.image ===
                                                    'string' &&
                                                !product.image.startsWith(
                                                    'http',
                                                )
                                                    ? `/assets/images/${product.image}`
                                                    : product.image
                                            }
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="w-full space-y-3 py-4">
                                        <div className="flex items-start justify-between gap-4 md:gap-8 lg:gap-12">
                                            {/* Left side: Title and Description */}
                                            <div className="min-w-0 flex-1">
                                                <h3 className="truncate text-2xl leading-tight font-extrabold text-coffee-dark select-none dark:text-primary">
                                                    {product.name}
                                                </h3>
                                                <p className="ml-0.2 mt-1 line-clamp-2 font-poppins text-lg leading-tight font-medium text-coffee-light lowercase select-none dark:text-muted-foreground">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Right side: Price */}
                                            <div className="relative flex-shrink-0 self-end">
                                                <span className="relative z-10 text-lg font-bold whitespace-nowrap text-coffee-primary select-none dark:text-primary">
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

            {/* Product Details Sidebar */}
            <ProductDetailsSheet
                product={selectedProduct}
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                onAddToCart={handleAddToCart}
                onConfirmPurchase={handleConfirmPurchase}
                language={language}
            />

            {/* Receipt Dialog */}
            <ReceiptDialog
                open={receiptOpen}
                onOpenChange={setReceiptOpen}
                singleItem={singlePurchaseItem}
            />
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
