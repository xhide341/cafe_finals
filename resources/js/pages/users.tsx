import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import UserDetailsDialog from '@/components/user-details-dialog';
import AppLayout from '@/layouts/app-layout';
import { index as usersRoute } from '@/routes/users';
import { type BreadcrumbItem, type UserManagement } from '@/types';
import { Head } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import {
    Activity,
    Check,
    Mail,
    Search,
    TrendingUp,
    UserCheck,
    Users as UsersIcon,
    X,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: usersRoute().url,
    },
];

export default function Users() {
    // NOTE: Using fake/demo data for local demonstration only
    const [users] = useState<UserManagement[]>([
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            email_verified_at: '2024-01-15T10:30:00Z',
            two_factor_enabled: true,
            created_at: '2024-01-15T10:30:00Z',
            updated_at: '2024-12-08T15:20:00Z',
            status: 'active',
            last_order_date: '2024-12-08T15:20:00Z',
            total_orders: 47,
            total_spent: 8450.0,
            newsletter_subscribed: true,
            last_login_at: '2024-12-09T08:15:00Z',
        },
        {
            id: 2,
            name: 'Sarah Miller',
            email: 'sarah.miller@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            email_verified_at: '2024-02-20T14:15:00Z',
            two_factor_enabled: false,
            created_at: '2024-02-20T14:15:00Z',
            updated_at: '2024-12-07T11:30:00Z',
            status: 'active',
            last_order_date: '2024-12-07T11:30:00Z',
            total_orders: 32,
            total_spent: 5680.5,
            newsletter_subscribed: true,
            last_login_at: '2024-12-09T07:45:00Z',
        },
        {
            id: 3,
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            email_verified_at: '2024-03-10T09:00:00Z',
            two_factor_enabled: true,
            created_at: '2024-03-10T09:00:00Z',
            updated_at: '2024-11-15T16:45:00Z',
            status: 'inactive',
            last_order_date: '2024-11-15T16:45:00Z',
            total_orders: 18,
            total_spent: 2340.0,
            newsletter_subscribed: false,
            last_login_at: '2024-11-20T10:00:00Z',
        },
        {
            id: 4,
            name: 'Emily Rodriguez',
            email: 'emily.r@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
            email_verified_at: '2024-04-05T12:30:00Z',
            two_factor_enabled: false,
            created_at: '2024-04-05T12:30:00Z',
            updated_at: '2024-12-06T09:15:00Z',
            status: 'active',
            last_order_date: '2024-12-06T09:15:00Z',
            total_orders: 25,
            total_spent: 4125.75,
            newsletter_subscribed: true,
            last_login_at: '2024-12-08T14:30:00Z',
        },
        {
            id: 5,
            name: 'David Kim',
            email: 'david.kim@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
            email_verified_at: null,
            two_factor_enabled: false,
            created_at: '2024-11-28T16:20:00Z',
            updated_at: '2024-11-28T16:20:00Z',
            status: 'inactive',
            last_order_date: null,
            total_orders: 0,
            total_spent: 0,
            newsletter_subscribed: false,
            last_login_at: '2024-11-28T16:20:00Z',
        },
        {
            id: 6,
            name: 'Lisa Anderson',
            email: 'lisa.anderson@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
            email_verified_at: '2024-05-12T11:00:00Z',
            two_factor_enabled: true,
            created_at: '2024-05-12T11:00:00Z',
            updated_at: '2024-12-09T10:30:00Z',
            status: 'active',
            last_order_date: '2024-12-09T10:30:00Z',
            total_orders: 51,
            total_spent: 12350.25,
            newsletter_subscribed: true,
            last_login_at: '2024-12-09T10:30:00Z',
        },
        {
            id: 7,
            name: 'James Wilson',
            email: 'james.w@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
            email_verified_at: '2024-06-18T13:45:00Z',
            two_factor_enabled: false,
            created_at: '2024-06-18T13:45:00Z',
            updated_at: '2024-10-22T08:20:00Z',
            status: 'inactive',
            last_order_date: '2024-10-22T08:20:00Z',
            total_orders: 12,
            total_spent: 1580.0,
            newsletter_subscribed: false,
            last_login_at: '2024-10-25T09:00:00Z',
        },
        {
            id: 8,
            name: 'Maria Garcia',
            email: 'maria.garcia@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
            email_verified_at: '2024-07-22T10:15:00Z',
            two_factor_enabled: false,
            created_at: '2024-07-22T10:15:00Z',
            updated_at: '2024-12-05T17:40:00Z',
            status: 'active',
            last_order_date: '2024-12-05T17:40:00Z',
            total_orders: 29,
            total_spent: 4890.5,
            newsletter_subscribed: true,
            last_login_at: '2024-12-08T16:20:00Z',
        },
        {
            id: 9,
            name: 'Robert Taylor',
            email: 'robert.t@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
            email_verified_at: '2024-08-03T14:30:00Z',
            two_factor_enabled: true,
            created_at: '2024-08-03T14:30:00Z',
            updated_at: '2024-09-15T12:00:00Z',
            status: 'suspended',
            last_order_date: '2024-09-15T12:00:00Z',
            total_orders: 8,
            total_spent: 920.0,
            newsletter_subscribed: false,
            last_login_at: '2024-09-20T10:30:00Z',
        },
        {
            id: 10,
            name: 'Jennifer Lee',
            email: 'jennifer.lee@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
            email_verified_at: '2024-09-14T09:45:00Z',
            two_factor_enabled: false,
            created_at: '2024-09-14T09:45:00Z',
            updated_at: '2024-12-04T13:25:00Z',
            status: 'active',
            last_order_date: '2024-12-04T13:25:00Z',
            total_orders: 22,
            total_spent: 3560.75,
            newsletter_subscribed: true,
            last_login_at: '2024-12-07T11:15:00Z',
        },
        {
            id: 11,
            name: 'Christopher Brown',
            email: 'chris.brown@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Christopher',
            email_verified_at: '2024-10-05T15:20:00Z',
            two_factor_enabled: false,
            created_at: '2024-10-05T15:20:00Z',
            updated_at: '2024-11-28T14:10:00Z',
            status: 'inactive',
            last_order_date: '2024-11-28T14:10:00Z',
            total_orders: 9,
            total_spent: 1245.0,
            newsletter_subscribed: false,
            last_login_at: '2024-12-01T08:45:00Z',
        },
        {
            id: 12,
            name: 'Amanda White',
            email: 'amanda.white@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amanda',
            email_verified_at: '2024-11-20T11:30:00Z',
            two_factor_enabled: false,
            created_at: '2024-11-20T11:30:00Z',
            updated_at: '2024-12-08T16:55:00Z',
            status: 'active',
            last_order_date: '2024-12-08T16:55:00Z',
            total_orders: 6,
            total_spent: 785.5,
            newsletter_subscribed: true,
            last_login_at: '2024-12-09T09:20:00Z',
        },
        {
            id: 13,
            name: 'Daniel Martinez',
            email: 'daniel.m@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel',
            email_verified_at: '2024-11-25T10:00:00Z',
            two_factor_enabled: false,
            created_at: '2024-11-25T10:00:00Z',
            updated_at: '2024-12-07T12:30:00Z',
            status: 'active',
            last_order_date: '2024-12-07T12:30:00Z',
            total_orders: 4,
            total_spent: 520.0,
            newsletter_subscribed: true,
            last_login_at: '2024-12-08T15:40:00Z',
        },
        {
            id: 14,
            name: 'Jessica Thompson',
            email: 'jessica.t@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
            email_verified_at: null,
            two_factor_enabled: false,
            created_at: '2024-12-01T14:15:00Z',
            updated_at: '2024-12-01T14:15:00Z',
            status: 'inactive',
            last_order_date: null,
            total_orders: 0,
            total_spent: 0,
            newsletter_subscribed: false,
            last_login_at: '2024-12-02T09:00:00Z',
        },
        {
            id: 15,
            name: 'Matthew Harris',
            email: 'matthew.h@example.com',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Matthew',
            email_verified_at: '2024-12-03T16:45:00Z',
            two_factor_enabled: true,
            created_at: '2024-12-03T16:45:00Z',
            updated_at: '2024-12-09T11:20:00Z',
            status: 'active',
            last_order_date: '2024-12-09T11:20:00Z',
            total_orders: 3,
            total_spent: 385.25,
            newsletter_subscribed: true,
            last_login_at: '2024-12-09T11:20:00Z',
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserManagement | null>(
        null,
    );
    const [dialogOpen, setDialogOpen] = useState(false);

    // Calculate statistics
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === 'active').length;
    const activePercentage = ((activeUsers / totalUsers) * 100).toFixed(1);

    const newsletterSubscribers = users.filter(
        (u) => u.newsletter_subscribed,
    ).length;
    const subscriberPercentage = (
        (newsletterSubscribers / totalUsers) *
        100
    ).toFixed(1);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newThisMonth = users.filter(
        (u) => new Date(u.created_at) >= thirtyDaysAgo,
    ).length;

    const totalOrders = users.reduce((sum, u) => sum + u.total_orders, 0);
    const averageOrders = (totalOrders / totalUsers).toFixed(1);

    // Filter users based on search
    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const getStatusBadge = (status: UserManagement['status']) => {
        const variants = {
            active: 'bg-green-500/10 text-green-500',
            inactive: 'bg-gray-500/10 text-gray-500',
            suspended: 'bg-red-500/10 text-red-500',
        };

        const labels = {
            active: 'Active',
            inactive: 'Inactive',
            suspended: 'Suspended',
        };

        return (
            <Badge variant="outline" className={variants[status]}>
                {labels[status]}
            </Badge>
        );
    };

    const handleUserClick = (user: UserManagement) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users Management" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Users Management</h1>
                        <p className="text-muted-foreground">
                            Monitor user activity, engagement, and account
                            status
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Users
                            </CardTitle>
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {totalUsers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Registered accounts
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Users
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {activeUsers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {activePercentage}% of total users
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Newsletter Subscribers
                            </CardTitle>
                            <Mail className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {newsletterSubscribers}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                {subscriberPercentage}% subscribed
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                New This Month
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                +{newThisMonth}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Avg {averageOrders} orders/user
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Users Table */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>All Users</CardTitle>
                                <CardDescription>
                                    Manage user accounts and view activity
                                </CardDescription>
                            </div>
                            <div className="relative w-64">
                                <Search className="absolute top-2.5 left-2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="pl-8"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Orders</TableHead>
                                    <TableHead>Last Order</TableHead>
                                    <TableHead>Total Spent</TableHead>
                                    <TableHead>Newsletter</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={user.avatar}
                                                        alt={user.name}
                                                    />
                                                    <AvatarFallback>
                                                        {getInitials(user.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(user.status)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {user.total_orders}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {user.last_order_date ? (
                                                <span className="text-sm">
                                                    {formatDistanceToNow(
                                                        new Date(
                                                            user.last_order_date,
                                                        ),
                                                        { addSuffix: true },
                                                    )}
                                                </span>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">
                                                    Never
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            ₱{user.total_spent.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            {user.newsletter_subscribed ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <X className="h-4 w-4 text-gray-400" />
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDistanceToNow(
                                                new Date(user.created_at),
                                                { addSuffix: true },
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() =>
                                                    handleUserClick(user)
                                                }
                                            >
                                                <UserCheck className="mr-2 h-4 w-4" />
                                                View Details
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* User Details Dialog */}
            <UserDetailsDialog
                user={selectedUser}
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            />
        </AppLayout>
    );
}
