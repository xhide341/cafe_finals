import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/orders';
import { type Order } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Check, X } from 'lucide-react';

interface OrderDetailsDialogProps {
    order: Order;
    open: boolean;
    onClose: () => void;
}

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20';
        case 'accepted':
            return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
        case 'declined':
            return 'bg-red-500/10 text-red-500 hover:bg-red-500/20';
        case 'cancelled':
            return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
        default:
            return '';
    }
};

const getStatusLabel = (status: Order['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

export default function OrderDetailsDialog({
    order,
    open,
    onClose,
}: OrderDetailsDialogProps) {
    const { data, setData, patch, processing } = useForm({
        status: order.status,
        customer_notes: order.customer_notes || '',
    });

    const handleAccept = () => {
        setData('status', 'accepted');
        patch(update(order.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    const handleDecline = () => {
        setData('status', 'declined');
        patch(update(order.id).url, {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    const isPending = order.status === 'pending';

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Order Details #{order.id}</DialogTitle>
                    <DialogDescription>
                        Full information about this order
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Product Image */}
                    {order.product_image && (
                        <div className="flex justify-center">
                            <img
                                src={order.product_image}
                                alt={order.product_name}
                                className="h-48 w-48 rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {/* Order Information Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label className="text-muted-foreground">
                                Product Name
                            </Label>
                            <p className="font-medium">{order.product_name}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                Status
                            </Label>
                            <div className="mt-1">
                                <Badge
                                    variant="outline"
                                    className={getStatusColor(order.status)}
                                >
                                    {getStatusLabel(order.status)}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                Quantity
                            </Label>
                            <p className="font-medium">{order.quantity}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                Price per Unit
                            </Label>
                            <p className="font-medium">${order.price}</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                Total Amount
                            </Label>
                            <p className="text-lg font-bold">
                                ${order.total_amount}
                            </p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">
                                Ordered At
                            </Label>
                            <p className="font-medium">
                                {format(
                                    new Date(order.ordered_at),
                                    'MMM dd, yyyy HH:mm',
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <Label className="text-muted-foreground">
                            Description
                        </Label>
                        <p className="mt-1 text-sm">{order.description}</p>
                    </div>

                    {/* Customer Notes - Full width with different background */}
                    <div className="rounded-lg bg-muted/50 p-4">
                        <Label htmlFor="customer_notes">Customer Notes</Label>
                        <Textarea
                            id="customer_notes"
                            value={data.customer_notes}
                            onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                            ) => setData('customer_notes', e.target.value)}
                            placeholder="Add notes about this order..."
                            className="mt-2 min-h-[100px] bg-background"
                            disabled={processing}
                        />
                    </div>
                </div>

                <DialogFooter>
                    {isPending && (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleDecline}
                                disabled={processing}
                                className="gap-1 border-red-500 text-red-500 hover:bg-red-500/10"
                            >
                                <X className="mr-0 h-4 w-4" />
                                Decline
                            </Button>
                            <Button
                                onClick={handleAccept}
                                disabled={processing}
                                className="gap-1 bg-green-600 hover:bg-green-700"
                            >
                                <Check className="mr-0 h-4 w-4" />
                                Accept
                            </Button>
                        </>
                    )}
                    {!isPending && (
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
