<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'string|max:500',
            'author' => 'string|max:255',
            'publisher' => 'string|max:255',
            'published_at' => 'date',
            'isbn' => 'string|max:13|min:10',
            'genre' => 'string|max:255',
            'language' => 'string|max:255',
            'format' => 'string|max:255',
            'pages' => 'integer',
            'price' => 'required|numeric|min:0.1|max:999999.99',
            'stock' => 'integer',
        ];
    }
}
