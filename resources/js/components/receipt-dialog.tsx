import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useCart } from '@/contexts/cart-context';
import type { CartItem } from '@/types';
import { router } from '@inertiajs/react';
import { Printer } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

interface ReceiptDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    singleItem?: CartItem | null;
}

export function ReceiptDialog({
    open,
    onOpenChange,
    singleItem,
}: ReceiptDialogProps) {
    const { items, getSubtotal, getTax, getTotal, clearCart, getItemPrice } =
        useCart();
    const receiptRef = useRef<HTMLDivElement>(null);

    // Use singleItem if provided, otherwise use cart items
    const receiptItems = singleItem ? [singleItem] : items;

    const calculateReceiptSubtotal = () => {
        if (singleItem) {
            return getItemPrice(singleItem) * singleItem.quantity;
        }
        return getSubtotal();
    };

    const calculateReceiptTax = () => {
        return calculateReceiptSubtotal() * 0.12;
    };

    const calculateReceiptTotal = () => {
        return calculateReceiptSubtotal() + calculateReceiptTax();
    };

    const orderNumber = `CR-${Date.now().toString().slice(-8)}`;
    const orderDate = new Date().toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    const handlePrint = () => {
        if (receiptRef.current) {
            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Receipt - ${orderNumber}</title>
                        <style>
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                            }
                            body {
                                font-family: 'Courier New', monospace;
                                padding: 20mm;
                                background: white;
                                color: black;
                            }
                            .receipt {
                                max-width: 80mm;
                                margin: 0 auto;
                            }
                            .header {
                                text-align: center;
                                border-bottom: 2px dashed #000;
                                padding-bottom: 10px;
                                margin-bottom: 10px;
                            }
                            .logo {
                                font-size: 24px;
                                font-weight: bold;
                                margin-bottom: 5px;
                            }
                            .info {
                                font-size: 12px;
                                margin-bottom: 10px;
                            }
                            .divider {
                                border-top: 1px dashed #000;
                                margin: 10px 0;
                            }
                            .items {
                                margin: 10px 0;
                            }
                            .item {
                                display: flex;
                                justify-content: space-between;
                                margin: 5px 0;
                                font-size: 12px;
                            }
                            .item-name {
                                flex: 1;
                            }
                            .item-qty {
                                width: 40px;
                                text-align: center;
                            }
                            .item-price {
                                width: 80px;
                                text-align: right;
                            }
                            .totals {
                                border-top: 2px dashed #000;
                                padding-top: 10px;
                                margin-top: 10px;
                            }
                            .total-row {
                                display: flex;
                                justify-content: space-between;
                                margin: 5px 0;
                                font-size: 12px;
                            }
                            .total-row.final {
                                font-size: 16px;
                                font-weight: bold;
                                border-top: 1px solid #000;
                                padding-top: 5px;
                                margin-top: 5px;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                font-size: 12px;
                                border-top: 2px dashed #000;
                                padding-top: 10px;
                            }
                            @media print {
                                body {
                                    padding: 0;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        ${receiptRef.current.innerHTML}
                    </body>
                    </html>
                `);
                printWindow.document.close();
                printWindow.focus();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 250);
            }
        }
    };

    const handlePlaceOrder = () => {
        toast.success('Order placed successfully!', {
            description: `Order #${orderNumber} has been confirmed`,
        });
        if (!singleItem) {
            clearCart();
        }
        onOpenChange(false);
        router.visit('/shop');
    };

    // Helper to format customization details
    const formatCustomizations = (item: CartItem) => {
        if (!item.customizations) return null;

        const details: string[] = [];
        const c = item.customizations;

        // Size
        details.push(
            `${c.size.charAt(0).toUpperCase() + c.size.slice(1)} (${
                c.size === 'small'
                    ? '12oz'
                    : c.size === 'medium'
                      ? '16oz'
                      : '20oz'
            })`,
        );

        // Sugar (now a percentage)
        details.push(`Sugar: ${c.sugarLevel}%`);

        // Milk
        const milkLabels = {
            none: 'No Milk',
            regular: 'Regular Milk',
            oat: 'Oat Milk',
            almond: 'Almond Milk',
        };
        details.push(milkLabels[c.milkOption]);

        // Add-ons
        if (c.extraShot) {
            details.push('Extra Shot');
        }
        if (c.whippedCream) {
            details.push('Whipped Cream');
        }
        if (c.cinnamonPowder) {
            details.push('Cinnamon Powder');
        }

        return details.join(', ');
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Order Receipt</DialogTitle>
                </DialogHeader>

                {/* Receipt Content */}
                <div
                    ref={receiptRef}
                    className="receipt rounded-lg bg-white p-6 text-black"
                >
                    {/* Header */}
                    <div className="header mb-4 border-b-2 border-dashed border-black pb-4 text-center">
                        <div className="logo mb-2 font-cursive text-2xl font-bold">
                            Cafe Rencontre
                        </div>
                        <div className="info text-xs">
                            123 Coffee Street, Manila
                            <br />
                            Tel: (02) 1234-5678
                        </div>
                    </div>

                    {/* Order Info */}
                    <div className="info mb-4 text-xs">
                        <div className="flex justify-between">
                            <span>Order #:</span>
                            <span className="font-bold">{orderNumber}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Date:</span>
                            <span>{orderDate}</span>
                        </div>
                    </div>

                    <div className="divider border-t border-dashed border-black" />

                    {/* Items */}
                    <div className="items my-4">
                        <div className="item mb-2 flex text-xs font-bold">
                            <div className="item-name flex-1">Item</div>
                            <div className="item-qty w-10 text-center">Qty</div>
                            <div className="item-price w-20 text-right">
                                Price
                            </div>
                        </div>
                        {receiptItems.map((item, index) => {
                            const itemTotal =
                                getItemPrice(item) * item.quantity;
                            const customizationText =
                                formatCustomizations(item);

                            return (
                                <div key={index} className="mb-3">
                                    <div className="item flex">
                                        <div className="item-name flex-1 text-xs">
                                            {item.product.name}
                                        </div>
                                        <div className="item-qty w-10 text-center text-xs">
                                            {item.quantity}
                                        </div>
                                        <div className="item-price w-20 text-right text-xs">
                                            ₱{itemTotal.toFixed(2)}
                                        </div>
                                    </div>
                                    {customizationText && (
                                        <div className="ml-2 text-[10px] text-gray-600">
                                            {customizationText}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Totals */}
                    <div className="totals border-t-2 border-dashed border-black pt-4">
                        <div className="total-row flex justify-between text-xs">
                            <span>Subtotal:</span>
                            <span>
                                ₱{calculateReceiptSubtotal().toFixed(2)}
                            </span>
                        </div>
                        <div className="total-row flex justify-between text-xs">
                            <span>Tax (12%):</span>
                            <span>₱{calculateReceiptTax().toFixed(2)}</span>
                        </div>
                        <div className="total-row final flex justify-between border-t border-black pt-2 text-base font-bold">
                            <span>TOTAL:</span>
                            <span>₱{calculateReceiptTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="footer mt-6 border-t-2 border-dashed border-black pt-4 text-center text-xs">
                        <p className="mb-1">Thank you for your order!</p>
                        <p>Please visit us again</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handlePrint}
                    >
                        <Printer className="mr-2 h-4 w-4" />
                        Print Receipt
                    </Button>
                    <Button className="flex-1" onClick={handlePlaceOrder}>
                        Place Order
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
