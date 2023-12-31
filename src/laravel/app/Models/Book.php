<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $table = 'books';
    protected $fillable = [
        'title',
        'description',
        'author',
        'publisher',
        'published_at',
        'isbn',
        'genre',
        'language',
        'format',
        'pages',
        'price',
        'stock',
    ];

    public function invoice()
    {
        return $this->belongsToMany(Invoice::class, 'book_invoice', 'book_id', 'invoice_id');
    }
}
