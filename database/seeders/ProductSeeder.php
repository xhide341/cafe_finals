<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Spanish Latte',
                'description' => 'hot, creamy',
                'price' => 49,
                'image' => 'spanish-latte.png',
            ],
            [
                'name' => 'Macchiato',
                'description' => 'hot, espresso',
                'price' => 49,
                'image' => 'macchiato.png',
            ],
            [
                'name' => 'Hazelnut Latte',
                'description' => 'hot, nutty',
                'price' => 49,
                'image' => 'hazelnut-latte.png',
            ],
            [
                'name' => 'Americano',
                'description' => 'hot, bold',
                'price' => 49,
                'image' => 'americano.png',
            ],
            [
                'name' => 'Caramel Macchiato',
                'description' => 'hot, sweet',
                'price' => 49,
                'image' => 'caramel-macchiato.png',
            ],
            [
                'name' => 'Vanilla Latte',
                'description' => 'hot, smooth',
                'price' => 49,
                'image' => 'vanilla-latte.png',
            ],
            [
                'name' => 'Iced Spanish Latte',
                'description' => 'iced, creamy',
                'price' => 49,
                'image' => 'iced-spanish-latte.png',
            ],
            [
                'name' => 'Iced Macchiato',
                'description' => 'iced, espresso',
                'price' => 49,
                'image' => 'iced-macchiato.png',
            ],
            [
                'name' => 'Iced Hazelnut Latte',
                'description' => 'iced, nutty',
                'price' => 49,
                'image' => 'iced-hazelnut-latte.png',
            ],
            [
                'name' => 'Iced Americano',
                'description' => 'iced, bold',
                'price' => 49,
                'image' => 'iced-americano.png',
            ],
            [
                'name' => 'Iced Caramel Macchiato',
                'description' => 'iced, sweet',
                'price' => 49,
                'image' => 'iced-caramel-macchiato.png',
            ],
            [
                'name' => 'Iced Vanilla Latte',
                'description' => 'iced, smooth',
                'price' => 49,
                'image' => 'iced-vanilla-latte.png',
            ],
        ];

        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
