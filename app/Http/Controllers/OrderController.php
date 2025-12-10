<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with('user')
            ->latest('ordered_at')
            ->get();

        return Inertia::render('orders', [
            'orders' => $orders,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,accepted,declined,cancelled',
            'customer_notes' => 'nullable|string',
        ]);

        $order->update($validated);

        return back()->with('success', 'Order status updated successfully.');
    }

        /**
     * Store a newly created order in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_name' => 'required|string',
            'description' => 'nullable|string',
            'product_image' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric',
            'total_amount' => 'required|numeric',
            'customer_notes' => 'nullable|string',
            'ordered_at' => 'required|date',
        ]);

        $order = new \App\Models\Order($validated);
        $order->user_id;
        $order->status = 'pending';
        $order->save();

        return back()->with('success', 'Order placed successfully!');
    }
}
