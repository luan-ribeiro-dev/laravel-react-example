<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookRequest;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{

    public function index()
    {
        $user = auth()->user();
        $books = Book::orderBy('created_at', 'desc')
            ->orderBy('id', 'desc');

        if ($user->role === 'customer') {
            $books->where('stock', '>', 0)
                ->select('id', 'title', 'author', 'price', 'stock');
        }

        return response()->json($books->paginate(100), 200);
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
                ->orderBy('id', 'asc')
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
        $book = Book::findOrFail($id);

        return response()->json($book, 200);
    }

    public function update(BookRequest $request, $id)
    {
        $validatedData = $request->validated();
        $book = Book::findOrFail($id);

        $book->update($validatedData);

        return response()->json([
            'message' => 'Book updated successfully',
        ], 200);
    }

    public function destroy($id)
    {
        Book::destroy($id);

        return response()->json([
            'message' => 'Book deleted successfully',
        ], 200);
    }
}
