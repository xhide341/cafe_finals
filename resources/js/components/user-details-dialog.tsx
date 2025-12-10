import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { type UserManagement } from '@/types';
import { format } from 'date-fns';
import {
    Calendar,
    CheckCircle2,
    Mail,
    Package,
    ShieldAlert,
    User,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

interface UserDetailsDialogProps {
    user: UserManagement | null;
    open: boolean;
    onClose: () => void;
}

const getStatusColor = (status: UserManagement['status']) => {
    switch (status) {
        case 'active':
            return 'bg-green-500/10 text-green-500';
        case 'inactive':
            return 'bg-gray-500/10 text-gray-500';
        case 'suspended':
            return 'bg-red-500/10 text-red-500';
        default:
            return '';
    }
};

const getStatusLabel = (status: UserManagement['status']) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
};

// Mock order history for demonstration
const getMockOrderHistory = (userId: number, totalOrders: number) => {
    if (totalOrders === 0) return [];

    const orders = [];
    const now = new Date();

    for (let i = 0; i < Math.min(5, totalOrders); i++) {
        const daysAgo = Math.floor(Math.random() * 60) + 1;
        const orderDate = new Date(now);
        orderDate.setDate(orderDate.getDate() - daysAgo);

        orders.push({
            id: `ORD-${userId}${String(i + 1).padStart(3, '0')}`,
            date: orderDate.toISOString(),
            items: Math.floor(Math.random() * 5) + 1,
            amount: Math.floor(Math.random() * 500) + 100,
            status: i === 0 ? 'completed' : 'completed',
        });
    }

    return orders;
};

export default function UserDetailsDialog({
    user,
    open,
    onClose,
}: UserDetailsDialogProps) {
    const [newsletterSubscribed, setNewsletterSubscribed] = useState(
        user?.newsletter_subscribed ?? false,
    );

    if (!user) return null;

    const orderHistory = getMockOrderHistory(user.id, user.total_orders);
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        Complete information about this user
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* User Profile Section */}
                    <div className="flex items-start gap-4 rounded-lg border p-4">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="text-lg">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-bold">
                                    {user.name}
                                </h3>
                                <Badge
                                    variant="outline"
                                    className={getStatusColor(user.status)}
                                >
                                    {getStatusLabel(user.status)}
                                </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Joined{' '}
                                    {format(
                                        new Date(user.created_at),
                                        'MMM dd, yyyy',
                                    )}
                                </div>
                            </div>
                            {user.email_verified_at && (
                                <div className="flex items-center gap-2 text-sm text-green-600">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Email Verified
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-lg border p-4 text-center">
                            <Package className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                            <p className="text-2xl font-bold">
                                {user.total_orders}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Total Orders
                            </p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                            <Wallet className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                            <p className="text-2xl font-bold">
                                ₱{user.total_spent.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Total Spent
                            </p>
                        </div>
                        <div className="rounded-lg border p-4 text-center">
                            <Calendar className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                            <p className="text-sm font-semibold">
                                {user.last_order_date
                                    ? format(
                                          new Date(user.last_order_date),
                                          'MMM dd, yyyy',
                                      )
                                    : 'Never'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                Last Order
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Account Information */}
                    <div className="space-y-3">
                        <h4 className="font-semibold">Account Information</h4>
                        <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
                            <div>
                                <Label className="text-muted-foreground">
                                    User ID
                                </Label>
                                <p className="font-medium">{user.id}</p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">
                                    Last Login
                                </Label>
                                <p className="font-medium">
                                    {user.last_login_at
                                        ? format(
                                              new Date(user.last_login_at),
                                              'MMM dd, yyyy HH:mm',
                                          )
                                        : 'Never'}
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">
                                    2FA Enabled
                                </Label>
                                <p className="font-medium">
                                    {user.two_factor_enabled ? 'Yes' : 'No'}
                                </p>
                            </div>
                            <div>
                                <Label className="text-muted-foreground">
                                    Account Created
                                </Label>
                                <p className="font-medium">
                                    {format(
                                        new Date(user.created_at),
                                        'MMM dd, yyyy',
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label className="text-base">
                                Newsletter Subscription
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Receive updates and promotional emails
                            </p>
                        </div>
                        <Switch
                            checked={newsletterSubscribed}
                            onCheckedChange={setNewsletterSubscribed}
                        />
                    </div>

                    <Separator />

                    {/* Order History */}
                    <div className="space-y-3">
                        <h4 className="font-semibold">
                            Recent Order History (Last 5)
                        </h4>
                        {orderHistory.length > 0 ? (
                            <div className="rounded-lg border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Order ID</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Items</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {orderHistory.map((order) => (
                                            <TableRow key={order.id}>
                                                <TableCell className="font-medium">
                                                    {order.id}
                                                </TableCell>
                                                <TableCell>
                                                    {format(
                                                        new Date(order.date),
                                                        'MMM dd, yyyy',
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    {order.items} items
                                                </TableCell>
                                                <TableCell>
                                                    ₱{order.amount.toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className="bg-green-500/10 text-green-500"
                                                    >
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="rounded-lg border p-8 text-center text-muted-foreground">
                                <Package className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                <p>No order history available</p>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Close
                    </Button>
                    {user.status !== 'suspended' ? (
                        <Button variant="destructive" className="gap-2">
                            <ShieldAlert className="h-4 w-4" />
                            Suspend Account
                        </Button>
                    ) : (
                        <Button variant="default" className="gap-2">
                            <User className="h-4 w-4" />
                            Reactivate Account
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
