<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    use HasFactory;

    protected $table = 'books';
    protected $fillable = [
        'title',
        'author',
        'description',
        'image',
        'price',
        'stock',
        'status',
    ];

    public function invoice()
    {
        return $this->belongsToMany(Invoice::class, 'invoice_book', 'book_id', 'invoice_id');
    }
}
