<?php

use App\Http\Controllers\BookController;
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
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [\App\Http\Controllers\AuthController::class, 'user']);
        Route::post('/logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    });
    
    Route::group(['prefix' => 'admin'], function () {
        Route::resource('books', BookController::class)->except(['create', 'edit']);
    });
});

Route::group(['prefix' => 'users'], function () {
    Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
});
