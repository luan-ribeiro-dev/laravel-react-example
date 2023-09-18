<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Books routes
    Route::get('books', [\App\Http\Controllers\BookController::class, 'index']);
    Route::get('books/{id}', [\App\Http\Controllers\BookController::class, 'show']);

    // Users routes
    
    // Admin routes
    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::post('books', [\App\Http\Controllers\BookController::class, 'store']);
        Route::put('books/{id}', [\App\Http\Controllers\BookController::class, 'update']);
        Route::delete('books/{id}', [\App\Http\Controllers\BookController::class, 'destroy']);
    });

    // Customer routes
    Route::prefix('customer')->middleware('customer')->group(function () {
        Route::post('checkout', [\App\Http\Controllers\InvoiceController::class, 'store']);
    });
});

Route::group(['prefix' => 'users'], function () {
    Route::get('/', [\App\Http\Controllers\AuthController::class, 'user'])->middleware('auth:sanctum');
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
});
