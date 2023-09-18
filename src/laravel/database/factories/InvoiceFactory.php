<?php

namespace Database\Factories;

use App\Models\Book;
use App\Models\Invoice;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $created_at = fake()->dateTimeBetween("-5 year", "now");
        return [
            'user_id' => 1,
            'invoice_number' => 'INV-' . fake()->time(),
            'status' => 'paid',
            'total_price' => fake()->numberBetween(5, 1000),
            'created_at' => $created_at,
            'updated_at' => $created_at,
        ];
    }

    /**
     * Set invoice books.
     * 
     * @param \Illuminate\Database\Eloquent\Collection<\App\Models\Book> $books
     * 
     * @return \Database\Factories\InvoiceFactory
     */
    public function withBooks($books) : InvoiceFactory
    {
        return $this->afterCreating(function (Invoice $invoice) use($books) {
            foreach ($books->random(3) as $book) {
                $invoice->books()->attach($book, [
                    'quantity' => 1,
                    'price' => $book->price,
                    'stock' => $book->stock,
                    'created_at' => $invoice->created_at,
                    'updated_at' => $invoice->updated_at,
                ]);
            }
            $invoice->refresh();
            $invoice->total_price = $invoice->books->sum(function ($book) {
                return $book->pivot->price * $book->pivot->quantity;
            });
            $invoice->save();
        });
    }
}
