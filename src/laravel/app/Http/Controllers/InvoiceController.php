<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class InvoiceController extends Controller
{
    public function store(Request $request) {
        $user = Auth::user();
        $books = array_map(function ($cartItem) {
            $book = Book::select('id', 'price', 'stock')->find($cartItem['book']['id']);
            return [
                'id' => $book->id,
                'price' => $book->price,
                'quantity' => $cartItem['quantity'],
                'stock' => $book->stock,
            ];
        }, $request->all());

        foreach ($books as $book) {
            if ($book['quantity'] > $book['stock']) {
                return response()->json([
                    'message' => 'Stock is not enough',
                    'data' => $book,
                ], 400);
            }
        }

        $invoice = new Invoice();
        $invoice->user_id = $user->id;
        $invoice->invoice_number = 'INV-' . time();
        $invoice->status = "paid";
        $invoice->total_price = array_reduce($books, function ($carry, $book) {
            return $carry + ($book['price'] * $book['quantity']);
        }, 0);
        $invoice->save();
        $invoice->refresh();

        try {
            $invoice->books()->attach(array_map(function ($book) {
                return [
                    'book_id' => $book['id'],
                    'quantity' => $book['quantity'],
                    'price' => $book['price'],
                    'stock' => $book['stock'],
                ];
            }, $books));

            foreach ($books as $book) {
                $bookModel = Book::find($book['id']);
                $bookModel->stock -= $book['quantity'];
                $bookModel->save();
            }
        } catch (\Exception $e) {
            $invoice->delete();

            return response()->json([
                'message' => 'Failed to create invoice',
                'data' => $e->getMessage(),
            ], 500);
        }

        return response()->json([
            'message' => 'Invoice created',
            'data' => $invoice,
        ], 200);
    }
}
