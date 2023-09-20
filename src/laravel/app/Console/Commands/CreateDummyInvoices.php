<?php

namespace App\Console\Commands;

use App\Models\Book;
use Illuminate\Console\Command;

class CreateDummyInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dummy:invoices';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create dummy invoices for testing purposes';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Create 1000 dummy invoices with books attached using the InvoiceFactory
        $this->info('Creating dummy invoices (0/10000)');

        $books = Book::factory()->count(50)->create();
        for ($i = 1; $i <= 10; $i++) {
            \App\Models\Invoice::factory()->withBooks($books)->count(1000)->create();
            $this->info('Creating dummy invoices (' . $i * 1000 . '/10000)');
        }
    }
}
