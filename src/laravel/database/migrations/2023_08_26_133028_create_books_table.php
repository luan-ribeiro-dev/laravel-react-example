<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable(true);
            $table->string('author')->nullable(true);
            $table->string('publisher')->nullable(true);
            $table->date('published_at')->nullable(true);
            $table->string('isbn')->nullable(true);
            $table->string('genre')->nullable(true);
            $table->string('language')->nullable(true);
            $table->string('format')->nullable(true);
            $table->integer('pages')->nullable(true);
            $table->float('price');
            $table->integer('stock')->nullable(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
