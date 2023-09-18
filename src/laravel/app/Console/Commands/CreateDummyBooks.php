<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class CreateDummyBooks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dummy:books';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create dummy books for testing purposes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Create 1000 dummy books using the BookFactory
        \App\Models\Book::factory()->count(1000)->create();
    }
}
