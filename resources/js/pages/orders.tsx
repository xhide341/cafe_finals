import OrderDetailsDialog from '@/components/order-details-dialog';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { index as ordersRoute } from '@/routes/orders';
import { type BreadcrumbItem, type Order } from '@/types';
import { Head } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: ordersRoute().url,
    },
];

interface OrdersProps {
    orders: Order[];
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

export default function Orders({ orders }: OrdersProps) {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRowClick = (order: Order) => {
        setSelectedOrder(order);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedOrder(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Orders Management</CardTitle>
                        <CardDescription>
                            View and manage all customer orders
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order ID</TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Total Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Ordered At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {orders.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center text-muted-foreground"
                                        >
                                            No orders found
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    orders.map((order) => (
                                        <TableRow
                                            key={order.id}
                                            onClick={() =>
                                                handleRowClick(order)
                                            }
                                            className="cursor-pointer hover:bg-muted/50"
                                        >
                                            <TableCell className="font-medium">
                                                #{order.id}
                                            </TableCell>
                                            <TableCell>
                                                {order.product_name}
                                            </TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {order.description}
                                            </TableCell>
                                            <TableCell>
                                                {order.quantity}
                                            </TableCell>
                                            <TableCell>
                                                ${order.total_amount}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={getStatusColor(
                                                        order.status,
                                                    )}
                                                >
                                                    {getStatusLabel(
                                                        order.status,
                                                    )}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                {format(
                                                    new Date(order.ordered_at),
                                                    'MMM dd, yyyy HH:mm',
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {selectedOrder && (
                <OrderDetailsDialog
                    order={selectedOrder}
                    open={isDialogOpen}
                    onClose={handleCloseDialog}
                />
            )}
        </AppLayout>
    );
}
