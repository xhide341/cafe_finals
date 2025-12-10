<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'product_name',
        'description',
        'product_image',
        'quantity',
        'price',
        'total_amount',
        'status',
        'customer_notes',
        'ordered_at',
    ];

    protected $casts = [
        'ordered_at' => 'datetime',
        'price' => 'decimal:2',
        'total_amount' => 'decimal:2',
        'quantity' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
