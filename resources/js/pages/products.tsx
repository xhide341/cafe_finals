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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { index as productsRoute } from '@/routes/products';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Coffee,
    Droplet,
    Package,
    Plus,
    Sparkles,
    Trash2,
    Wine,
} from 'lucide-react';
import { useState } from 'react';

// Import coffee images
import americanoImg from '../../assets/images/americano.png';
import caramelMacchiatoImg from '../../assets/images/caramel-macchiato.png';
import hazelnutLatteImg from '../../assets/images/hazelnut-latte.png';
import icedAmericanoImg from '../../assets/images/iced-americano.png';
import icedCaramelMacchiatoImg from '../../assets/images/iced-caramel-macchiato.png';
import icedHazelnutLatteImg from '../../assets/images/iced-hazelnut-latte.png';
import icedMacchiatoImg from '../../assets/images/iced-macchiato.png';
import icedSpanishLatteImg from '../../assets/images/iced-spanish-latte.png';
import icedVanillaLatteImg from '../../assets/images/iced-vanilla-latte.png';
import macchiatoImg from '../../assets/images/macchiato.png';
import spanishLatteImg from '../../assets/images/spanish-latte.png';
import vanillaLatteImg from '../../assets/images/vanilla-latte.png';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: productsRoute().url,
    },
];

interface ProductItem {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    status: 'available' | 'low-stock' | 'out-of-stock';
}

interface InventoryItem {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    minStock: number;
    status: 'available' | 'low' | 'critical';
}

interface AddOn {
    id: string;
    name: string;
    price: number;
    available: boolean;
}

export default function Products() {
    // Products data from shop.tsx
    const [products] = useState<ProductItem[]>([
        {
            id: 1,
            name: 'Spanish Latte',
            description: 'hot, creamy',
            price: 49,
            image: spanishLatteImg,
            category: 'Hot Coffee',
            stock: 150,
            status: 'available',
        },
        {
            id: 2,
            name: 'Macchiato',
            description: 'hot, espresso',
            price: 49,
            image: macchiatoImg,
            category: 'Hot Coffee',
            stock: 120,
            status: 'available',
        },
        {
            id: 3,
            name: 'Hazelnut Latte',
            description: 'hot, nutty',
            price: 49,
            image: hazelnutLatteImg,
            category: 'Hot Coffee',
            stock: 25,
            status: 'low-stock',
        },
        {
            id: 4,
            name: 'Americano',
            description: 'hot, bold',
            price: 49,
            image: americanoImg,
            category: 'Hot Coffee',
            stock: 200,
            status: 'available',
        },
        {
            id: 5,
            name: 'Caramel Macchiato',
            description: 'hot, sweet',
            price: 49,
            image: caramelMacchiatoImg,
            category: 'Hot Coffee',
            stock: 0,
            status: 'out-of-stock',
        },
        {
            id: 6,
            name: 'Vanilla Latte',
            description: 'hot, smooth',
            price: 49,
            image: vanillaLatteImg,
            category: 'Hot Coffee',
            stock: 180,
            status: 'available',
        },
        {
            id: 7,
            name: 'Iced Spanish Latte',
            description: 'iced, creamy',
            price: 49,
            image: icedSpanishLatteImg,
            category: 'Iced Coffee',
            stock: 140,
            status: 'available',
        },
        {
            id: 8,
            name: 'Iced Macchiato',
            description: 'iced, espresso',
            price: 49,
            image: icedMacchiatoImg,
            category: 'Iced Coffee',
            stock: 110,
            status: 'available',
        },
        {
            id: 9,
            name: 'Iced Hazelnut Latte',
            description: 'iced, nutty',
            price: 49,
            image: icedHazelnutLatteImg,
            category: 'Iced Coffee',
            stock: 15,
            status: 'low-stock',
        },
        {
            id: 10,
            name: 'Iced Americano',
            description: 'iced, bold',
            price: 49,
            image: icedAmericanoImg,
            category: 'Iced Coffee',
            stock: 190,
            status: 'available',
        },
        {
            id: 11,
            name: 'Iced Caramel Macchiato',
            description: 'iced, sweet',
            price: 49,
            image: icedCaramelMacchiatoImg,
            category: 'Iced Coffee',
            stock: 85,
            status: 'available',
        },
        {
            id: 12,
            name: 'Iced Vanilla Latte',
            description: 'iced, smooth',
            price: 49,
            image: icedVanillaLatteImg,
            category: 'Iced Coffee',
            stock: 95,
            status: 'available',
        },
    ]);

    // Cup Sizes Inventory
    const [cupSizes] = useState<InventoryItem[]>([
        {
            id: 'cup-small',
            name: 'Small Cups (8oz)',
            quantity: 450,
            unit: 'cups',
            minStock: 200,
            status: 'available',
        },
        {
            id: 'cup-medium',
            name: 'Medium Cups (12oz)',
            quantity: 180,
            unit: 'cups',
            minStock: 250,
            status: 'low',
        },
        {
            id: 'cup-large',
            name: 'Large Cups (16oz)',
            quantity: 80,
            unit: 'cups',
            minStock: 150,
            status: 'critical',
        },
    ]);

    // Milk Options Inventory
    const [milkOptions] = useState<InventoryItem[]>([
        {
            id: 'milk-regular',
            name: 'Regular Milk',
            quantity: 45,
            unit: 'liters',
            minStock: 20,
            status: 'available',
        },
        {
            id: 'milk-oat',
            name: 'Oat Milk',
            quantity: 18,
            unit: 'liters',
            minStock: 15,
            status: 'low',
        },
        {
            id: 'milk-almond',
            name: 'Almond Milk',
            quantity: 8,
            unit: 'liters',
            minStock: 10,
            status: 'critical',
        },
    ]);

    // Sugar/Sweetener Inventory
    const [sugarInventory] = useState<InventoryItem[]>([
        {
            id: 'sugar-white',
            name: 'White Sugar',
            quantity: 25,
            unit: 'kg',
            minStock: 10,
            status: 'available',
        },
        {
            id: 'sugar-brown',
            name: 'Brown Sugar',
            quantity: 8,
            unit: 'kg',
            minStock: 8,
            status: 'low',
        },
        {
            id: 'sugar-honey',
            name: 'Honey',
            quantity: 3,
            unit: 'liters',
            minStock: 5,
            status: 'critical',
        },
        {
            id: 'sugar-syrup',
            name: 'Simple Syrup',
            quantity: 12,
            unit: 'liters',
            minStock: 8,
            status: 'available',
        },
    ]);

    // Add-ons/Toppings (from product-details-sheet.tsx)
    const [addOns] = useState<AddOn[]>([
        { id: 'addon-1', name: 'Extra Shot', price: 15, available: true },
        { id: 'addon-2', name: 'Whipped Cream', price: 10, available: true },
        { id: 'addon-3', name: 'Cinnamon Powder', price: 5, available: true },
        { id: 'addon-4', name: 'Vanilla Syrup', price: 10, available: true },
        { id: 'addon-5', name: 'Caramel Drizzle', price: 10, available: true },
        { id: 'addon-6', name: 'Chocolate Chips', price: 15, available: false },
    ]);

    const getStatusBadge = (
        status: 'available' | 'low-stock' | 'out-of-stock' | 'low' | 'critical',
    ) => {
        const variants = {
            available: 'bg-green-500/10 text-green-500',
            'low-stock': 'bg-yellow-500/10 text-yellow-500',
            'out-of-stock': 'bg-red-500/10 text-red-500',
            low: 'bg-yellow-500/10 text-yellow-500',
            critical: 'bg-red-500/10 text-red-500',
        };

        const labels = {
            available: 'Available',
            'low-stock': 'Low Stock',
            'out-of-stock': 'Out of Stock',
            low: 'Low Stock',
            critical: 'Critical',
        };

        return (
            <Badge variant="outline" className={variants[status]}>
                {labels[status]}
            </Badge>
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products Management" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Products & Inventory
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your menu items, stock levels, and
                            customization options
                        </p>
                    </div>
                    <Button variant="coffee">
                        <Plus className="mr-0 h-4 w-4" />
                        Add Product
                    </Button>
                </div>

                {/* Tabs for different sections */}
                <Tabs defaultValue="products" className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="products">
                            <Coffee className="mr-2 h-4 w-4" />
                            Products
                        </TabsTrigger>
                        <TabsTrigger value="cups">
                            <Wine className="mr-2 h-4 w-4" />
                            Cup Sizes
                        </TabsTrigger>
                        <TabsTrigger value="milk">
                            <Droplet className="mr-2 h-4 w-4" />
                            Milk Options
                        </TabsTrigger>
                        <TabsTrigger value="sugar">
                            <Sparkles className="mr-2 h-4 w-4" />
                            Sugar/Sweeteners
                        </TabsTrigger>
                        <TabsTrigger value="addons">
                            <Package className="mr-2 h-4 w-4" />
                            Add-ons
                        </TabsTrigger>
                    </TabsList>

                    {/* Products Tab */}
                    <TabsContent value="products" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Coffee Menu Products</CardTitle>
                                <CardDescription>
                                    Manage your coffee menu items and stock
                                    levels
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-12 w-12 rounded-md object-cover"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {product.name}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {product.description}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">
                                                        {product.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    ₱{product.price}
                                                </TableCell>
                                                <TableCell>
                                                    {product.stock}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        product.status,
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Cup Sizes Tab */}
                    <TabsContent value="cups" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Cup Sizes Inventory</CardTitle>
                                <CardDescription>
                                    Track available cup sizes and stock levels
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {cupSizes.map((cup) => (
                                    <div
                                        key={cup.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold">
                                                    {cup.name}
                                                </h3>
                                                {getStatusBadge(cup.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Minimum stock: {cup.minStock}{' '}
                                                {cup.unit}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold">
                                                    {cup.quantity}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {cup.unit}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Add qty"
                                                    className="w-24"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="coffee"
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Milk Options Tab */}
                    <TabsContent value="milk" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Milk Options Inventory</CardTitle>
                                <CardDescription>
                                    Manage different milk types and stock levels
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {milkOptions.map((milk) => (
                                    <div
                                        key={milk.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold">
                                                    {milk.name}
                                                </h3>
                                                {getStatusBadge(milk.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Minimum stock: {milk.minStock}{' '}
                                                {milk.unit}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold">
                                                    {milk.quantity}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {milk.unit}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Add qty"
                                                    className="w-24"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="coffee"
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Sugar/Sweeteners Tab */}
                    <TabsContent value="sugar" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Sugar & Sweeteners Inventory
                                </CardTitle>
                                <CardDescription>
                                    Track sugar levels and sweetener options
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {sugarInventory.map((sugar) => (
                                    <div
                                        key={sugar.id}
                                        className="flex items-center justify-between rounded-lg border p-4"
                                    >
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-semibold">
                                                    {sugar.name}
                                                </h3>
                                                {getStatusBadge(sugar.status)}
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Minimum stock: {sugar.minStock}{' '}
                                                {sugar.unit}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold">
                                                    {sugar.quantity}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                    {sugar.unit}
                                                </p>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Add qty"
                                                    className="w-24"
                                                />
                                                <Button
                                                    size="sm"
                                                    variant="coffee"
                                                >
                                                    Update
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Add-ons Tab */}
                    <TabsContent value="addons" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add-ons & Toppings</CardTitle>
                                <CardDescription>
                                    Manage available add-ons and their prices
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Availability</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {addOns.map((addon) => (
                                            <TableRow key={addon.id}>
                                                <TableCell className="font-medium">
                                                    {addon.name}
                                                </TableCell>
                                                <TableCell>
                                                    ₱{addon.price}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant="outline"
                                                        className={
                                                            addon.available
                                                                ? 'bg-green-500/10 text-green-500'
                                                                : 'bg-gray-500/10 text-gray-500'
                                                        }
                                                    >
                                                        {addon.available
                                                            ? 'Available'
                                                            : 'Unavailable'}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                        >
                                                            {addon.available
                                                                ? 'Disable'
                                                                : 'Enable'}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            className="text-red-500 hover:text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
