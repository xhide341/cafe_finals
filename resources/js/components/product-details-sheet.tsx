import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
} from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { useCart } from '@/contexts/cart-context';
import { type Product, type ProductCustomization } from '@/types';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailsSheetProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddToCart: (
        product: Product,
        quantity: number,
        customizations: ProductCustomization,
    ) => void;
    onConfirmPurchase: (
        product: Product,
        quantity: number,
        customizations: ProductCustomization,
    ) => void;
    language: 'EN' | 'PH';
}

// Customization pricing
const CUSTOMIZATION_PRICES = {
    size: {
        small: 0,
        medium: 10,
        large: 20,
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

export function ProductDetailsSheet({
    product,
    open,
    onOpenChange,
    onAddToCart,
    onConfirmPurchase,
    language,
}: ProductDetailsSheetProps) {
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [sugarLevel, setSugarLevel] = useState<number>(50);
    const [milkOption, setMilkOption] = useState<
        'none' | 'regular' | 'oat' | 'almond'
    >('regular');
    const [extraShot, setExtraShot] = useState(false);
    const [whippedCream, setWhippedCream] = useState(false);
    const [cinnamonPowder, setCinnamonPowder] = useState(false);
    const { addItem } = useCart();

    if (!product) return null;

    // Reset state when product changes or sheet closes
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setQuantity(1);
            setSize('medium');
            setSugarLevel(50);
            setMilkOption('regular');
            setExtraShot(false);
            setWhippedCream(false);
            setCinnamonPowder(false);
        }
        onOpenChange(newOpen);
    };

    const incrementQuantity = () => setQuantity((q) => q + 1);
    const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1));

    const calculateTotalPrice = () => {
        let total = product.price;
        total += CUSTOMIZATION_PRICES.size[size];
        total += CUSTOMIZATION_PRICES.milkOption[milkOption];
        if (extraShot) {
            total += CUSTOMIZATION_PRICES.extraShot;
        }
        if (whippedCream) {
            total += CUSTOMIZATION_PRICES.whippedCream;
        }
        if (cinnamonPowder) {
            total += CUSTOMIZATION_PRICES.cinnamonPowder;
        }
        return total * quantity;
    };

    const convertPrice = (price: number) => {
        if (language === 'EN') {
            return (price / 56).toFixed(2);
        }
        return price.toFixed(2);
    };

    const getCurrencySymbol = () => {
        return language === 'EN' ? '$' : '₱';
    };

    const getCustomizations = (): ProductCustomization => ({
        size,
        sugarLevel,
        milkOption,
        extraShot,
        whippedCream,
        cinnamonPowder,
    });

    const handleAddToCart = () => {
        addItem(product, quantity);
        onAddToCart(product, quantity, getCustomizations());
        handleOpenChange(false);
    };

    const handleConfirmPurchase = () => {
        onConfirmPurchase(product, quantity, getCustomizations());
    };

    return (
        <Sheet open={open} onOpenChange={handleOpenChange}>
            <SheetContent
                side="right"
                className="w-full overflow-y-auto sm:max-w-lg"
            >
                <SheetHeader className="px-4 pt-4 sm:px-6 sm:pt-6">
                    <h2 className="text-2xl font-bold text-card-foreground">
                        {product.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        {product.description}
                    </p>
                </SheetHeader>

                <div className="space-y-6 px-4 sm:px-6">
                    {/* Product Image */}
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted">
                        <img
                            src={
                                typeof product.image === 'string' &&
                                !product.image.startsWith('http')
                                    ? `/assets/images/${product.image}`
                                    : product.image
                            }
                            alt={product.name}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">Size</Label>
                        <RadioGroup
                            value={size}
                            onValueChange={(value) =>
                                setSize(value as 'small' | 'medium' | 'large')
                            }
                            className="mt-1"
                        >
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                        value="small"
                                        id="size-small"
                                    />
                                    <Label
                                        htmlFor="size-small"
                                        className="cursor-pointer"
                                    >
                                        Small (12oz)
                                    </Label>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    Base price
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                        value="medium"
                                        id="size-medium"
                                    />
                                    <Label
                                        htmlFor="size-medium"
                                        className="cursor-pointer"
                                    >
                                        Medium (16oz)
                                    </Label>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.size.medium,
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem
                                        value="large"
                                        id="size-large"
                                    />
                                    <Label
                                        htmlFor="size-large"
                                        className="cursor-pointer"
                                    >
                                        Large (20oz)
                                    </Label>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.size.large,
                                    )}
                                </span>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Sugar Level */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-semibold">
                                Sugar Level
                            </Label>
                            <span className="text-sm text-muted-foreground">
                                {sugarLevel}%
                            </span>
                        </div>
                        <Slider
                            value={[sugarLevel]}
                            onValueChange={(value) => setSugarLevel(value[0])}
                            min={0}
                            max={100}
                            step={1}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>No Sugar</span>
                            <span>Extra Sweet</span>
                        </div>
                    </div>

                    {/* Milk Options */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">
                            Milk Option
                        </Label>
                        <RadioGroup
                            value={milkOption}
                            onValueChange={(value) =>
                                setMilkOption(
                                    value as
                                        | 'none'
                                        | 'regular'
                                        | 'oat'
                                        | 'almond',
                                )
                            }
                            className="mt-1"
                        >
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center">
                                    <RadioGroupItem
                                        value="none"
                                        id="milk-none"
                                    />
                                    <Label
                                        htmlFor="milk-none"
                                        className="ml-3 cursor-pointer"
                                    >
                                        No Milk
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center">
                                    <RadioGroupItem
                                        value="regular"
                                        id="milk-regular"
                                    />
                                    <Label
                                        htmlFor="milk-regular"
                                        className="ml-3 cursor-pointer"
                                    >
                                        Regular Milk
                                    </Label>
                                </div>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center">
                                    <RadioGroupItem value="oat" id="milk-oat" />
                                    <Label
                                        htmlFor="milk-oat"
                                        className="ml-3 cursor-pointer"
                                    >
                                        Oat Milk
                                    </Label>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.milkOption.oat,
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                                <div className="flex items-center">
                                    <RadioGroupItem
                                        value="almond"
                                        id="milk-almond"
                                    />
                                    <Label
                                        htmlFor="milk-almond"
                                        className="ml-3 cursor-pointer"
                                    >
                                        Almond Milk
                                    </Label>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.milkOption.almond,
                                    )}
                                </span>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">
                            Add-ons
                        </Label>
                        <div className="mt-1 flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="extra-shot"
                                    checked={extraShot}
                                    onCheckedChange={(checked) =>
                                        setExtraShot(checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="extra-shot"
                                    className="cursor-pointer"
                                >
                                    Extra Espresso Shot
                                </Label>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                +{getCurrencySymbol()}
                                {convertPrice(CUSTOMIZATION_PRICES.extraShot)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="whipped-cream"
                                    checked={whippedCream}
                                    onCheckedChange={(checked) =>
                                        setWhippedCream(checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="whipped-cream"
                                    className="cursor-pointer"
                                >
                                    Whipped Cream
                                </Label>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                +{getCurrencySymbol()}
                                {convertPrice(
                                    CUSTOMIZATION_PRICES.whippedCream,
                                )}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="cinnamon-powder"
                                    checked={cinnamonPowder}
                                    onCheckedChange={(checked) =>
                                        setCinnamonPowder(checked === true)
                                    }
                                />
                                <Label
                                    htmlFor="cinnamon-powder"
                                    className="cursor-pointer"
                                >
                                    Cinnamon Powder
                                </Label>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                +{getCurrencySymbol()}
                                {convertPrice(
                                    CUSTOMIZATION_PRICES.cinnamonPowder,
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="space-y-3">
                        <Label className="text-base font-semibold">
                            Quantity
                        </Label>
                        <div className="mt-1 flex items-center gap-4">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={decrementQuantity}
                                disabled={quantity <= 1}
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span className="min-w-[3rem] text-center text-xl font-semibold">
                                {quantity}
                            </span>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={incrementQuantity}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Base Price</span>
                            <span>
                                {getCurrencySymbol()}
                                {convertPrice(product.price)}
                            </span>
                        </div>
                        {size !== 'small' && (
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Size Upgrade</span>
                                <span>
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.size[size],
                                    )}
                                </span>
                            </div>
                        )}
                        {milkOption !== 'none' && milkOption !== 'regular' && (
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>
                                    {milkOption === 'oat'
                                        ? 'Oat Milk'
                                        : 'Almond Milk'}
                                </span>
                                <span>
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.milkOption[
                                            milkOption
                                        ],
                                    )}
                                </span>
                            </div>
                        )}
                        {extraShot && (
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Extra Shot</span>
                                <span>
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.extraShot,
                                    )}
                                </span>
                            </div>
                        )}
                        {whippedCream && (
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Whipped Cream</span>
                                <span>
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.whippedCream,
                                    )}
                                </span>
                            </div>
                        )}
                        {cinnamonPowder && (
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Cinnamon Powder</span>
                                <span>
                                    +{getCurrencySymbol()}
                                    {convertPrice(
                                        CUSTOMIZATION_PRICES.cinnamonPowder,
                                    )}
                                </span>
                            </div>
                        )}
                        {quantity > 1 && (
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Quantity</span>
                                <span>×{quantity}</span>
                            </div>
                        )}
                        <div className="border-t pt-2">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span className="text-primary">
                                    {getCurrencySymbol()}
                                    {convertPrice(calculateTotalPrice())}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <SheetFooter className="px-4 py-4 sm:px-6 sm:py-6">
                    <div className="flex w-full flex-col gap-2">
                        <Button
                            onClick={handleAddToCart}
                            size="lg"
                            variant="outline"
                            className="w-full"
                        >
                            Add to Cart
                        </Button>
                        <Button
                            onClick={handleConfirmPurchase}
                            size="lg"
                            className="w-full"
                            variant="coffee"
                        >
                            Confirm Purchase
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
