import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { DollarSign, ShoppingCart, TrendingUp, Users } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    XAxis,
    YAxis,
} from 'recharts';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

// Fake data for charts
const salesData = [
    { month: 'Jan', sales: 4200, orders: 245 },
    { month: 'Feb', sales: 3800, orders: 198 },
    { month: 'Mar', sales: 5100, orders: 312 },
    { month: 'Apr', sales: 4600, orders: 278 },
    { month: 'May', sales: 6200, orders: 389 },
    { month: 'Jun', sales: 7100, orders: 421 },
];

const productCategories = [
    { name: 'Espresso', value: 4200, fill: '#593a2f' },
    { name: 'Latte', value: 3100, fill: '#7a584a' },
    { name: 'Cappuccino', value: 2800, fill: '#a17d6d' },
    { name: 'Cold Brew', value: 2200, fill: '#c9a896' },
    { name: 'Pastries', value: 1900, fill: '#8c5c46' },
];

const revenueData = [
    { day: 'Mon', revenue: 890 },
    { day: 'Tue', revenue: 1230 },
    { day: 'Wed', revenue: 1050 },
    { day: 'Thu', revenue: 1420 },
    { day: 'Fri', revenue: 1680 },
    { day: 'Sat', revenue: 2100 },
    { day: 'Sun', revenue: 1850 },
];

const chartConfig = {
    sales: {
        label: 'Sales',
        color: '#593a2f',
    },
    orders: {
        label: 'Orders',
        color: '#a17d6d',
    },
    revenue: {
        label: 'Revenue',
        color: '#7a584a',
    },
};

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">$45,231</div>
                            <p className="text-xs text-muted-foreground">
                                +20.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Orders
                            </CardTitle>
                            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+2,350</div>
                            <p className="text-xs text-muted-foreground">
                                +15.3% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +12.5% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Growth
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12.5%</div>
                            <p className="text-xs text-muted-foreground">
                                +4.3% from last month
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Row */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    {/* Sales Bar Chart */}
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Sales Overview</CardTitle>
                            <CardDescription>
                                Monthly sales and orders for the last 6 months
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ChartContainer
                                config={chartConfig}
                                className="h-[300px] w-full"
                            >
                                <BarChart data={salesData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <ChartLegend
                                        content={<ChartLegendContent />}
                                    />
                                    <Bar
                                        dataKey="sales"
                                        fill="var(--color-sales)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <Bar
                                        dataKey="orders"
                                        fill="var(--color-orders)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Product Categories Pie Chart */}
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Product Categories</CardTitle>
                            <CardDescription>
                                Sales distribution by product type
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer
                                config={chartConfig}
                                className="h-[300px] w-full"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={productCategories}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) =>
                                            `${name}: ${(percent * 100).toFixed(0)}%`
                                        }
                                        outerRadius={80}
                                        dataKey="value"
                                    >
                                        {productCategories.map(
                                            (entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={entry.fill}
                                                />
                                            ),
                                        )}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue Line Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Revenue Trend</CardTitle>
                        <CardDescription>
                            Daily revenue for the current week
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer
                            config={chartConfig}
                            className="h-[300px] w-full"
                        >
                            <LineChart data={revenueData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="var(--color-revenue)"
                                    strokeWidth={2}
                                    dot={{ fill: 'var(--color-revenue)' }}
                                />
                            </LineChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
