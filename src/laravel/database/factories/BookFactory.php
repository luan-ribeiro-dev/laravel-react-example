<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'author' => fake()->name(),
            'publisher' => fake()->company(),
            'published_at' => fake()->date(),
            'isbn' => fake()->isbn13(),
            'genre' => fake()->word(),
            'language' => fake()->languageCode(),
            'format' => fake()->word(),
            'pages' => fake()->numberBetween(100, 1000),
            'price' => fake()->numberBetween(10, 100),
            'stock' => fake()->numberBetween(10, 500)
        ];
    }
}
