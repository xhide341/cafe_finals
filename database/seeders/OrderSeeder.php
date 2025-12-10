<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $orders = [
            [
                'user_id' => $user?->id,
                'product_name' => 'Caramel Macchiato',
                'description' => 'Rich espresso with vanilla syrup and steamed milk, topped with caramel drizzle',
                'product_image' => 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400',
                'quantity' => 2,
                'price' => 5.50,
                'total_amount' => 11.00,
                'status' => 'pending',
                'customer_notes' => 'Please make it extra hot',
                'ordered_at' => now()->subHours(2),
            ],
            [
                'user_id' => $user?->id,
                'product_name' => 'Cappuccino',
                'description' => 'Classic Italian coffee drink with equal parts espresso, steamed milk, and foam',
                'product_image' => 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400',
                'quantity' => 1,
                'price' => 4.75,
                'total_amount' => 4.75,
                'status' => 'accepted',
                'customer_notes' => null,
                'ordered_at' => now()->subHours(5),
            ],
            [
                'user_id' => $user?->id,
                'product_name' => 'Iced Latte',
                'description' => 'Smooth espresso with cold milk served over ice',
                'product_image' => 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400',
                'quantity' => 3,
                'price' => 4.25,
                'total_amount' => 12.75,
                'status' => 'pending',
                'customer_notes' => 'Light ice, oat milk please',
                'ordered_at' => now()->subHours(1),
            ],
            [
                'user_id' => $user?->id,
                'product_name' => 'Chocolate Croissant',
                'description' => 'Buttery, flaky pastry filled with rich dark chocolate',
                'product_image' => 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
                'quantity' => 5,
                'price' => 3.50,
                'total_amount' => 17.50,
                'status' => 'accepted',
                'customer_notes' => 'For office meeting',
                'ordered_at' => now()->subDay(),
            ],
            [
                'user_id' => $user?->id,
                'product_name' => 'Cold Brew Coffee',
                'description' => 'Smooth, less acidic coffee steeped in cold water for 12 hours',
                'product_image' => 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
                'quantity' => 1,
                'price' => 4.00,
                'total_amount' => 4.00,
                'status' => 'declined',
                'customer_notes' => null,
                'ordered_at' => now()->subHours(8),
            ],
            [
                'user_id' => $user?->id,
                'product_name' => 'Vanilla Frappuccino',
                'description' => 'Blended iced coffee drink with vanilla flavor and whipped cream',
                'product_image' => 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
                'quantity' => 2,
                'price' => 5.75,
                'total_amount' => 11.50,
                'status' => 'pending',
                'customer_notes' => 'Extra whipped cream on top',
                'ordered_at' => now()->subMinutes(30),
            ],
        ];

        foreach ($orders as $order) {
            Order::create($order);
        }
    }
}
