<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    // Show books with pagination on index function
    public function index()
    {
        $books = Book::orderBy('title')
            ->paginate(10);

        return response()->json([
            'books' => $books,
        ], 200);
    }

    public function store(BookRequest $request)
    {
        $data = $request->validated();
        
        Book::create($data);

        // Limit of 1000000 books in the database, delete the oldest books
        $count = Book::count();
        while ($count > 1000000) {
            $bookRemoveCount = 1000;
            Book::orderBy('created_at', 'asc')
                ->take($bookRemoveCount)
                ->delete();

            $count -= $bookRemoveCount;
        }

        return response()->json([
            'message' => 'Book created successfully',
        ], 201);
    }

    public function show($id)
    {

    }

    public function update($id)
    {

    }

    public function destroy($id)
    {

    }
}
