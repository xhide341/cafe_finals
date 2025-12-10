<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('shop', [App\Http\Controllers\ProductController::class, 'index'])->name('shop');

Route::get('cart', function () {
    return Inertia::render('cart');
})->name('cart');


Route::post('orders', [App\Http\Controllers\OrderController::class, 'store'])->name('orders.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('orders', [App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::patch('orders/{order}', [App\Http\Controllers\OrderController::class, 'update'])->name('orders.update');

    Route::get('products', [App\Http\Controllers\ProductController::class, 'index'])->name('products.index');
    
    Route::get('users', [App\Http\Controllers\UserManagementController::class, 'index'])->name('users.index');
});

require __DIR__.'/settings.php';
