<?php

namespace App\Http\Pagination;

use Illuminate\Pagination\LengthAwarePaginator;

class CustomPaginator extends LengthAwarePaginator
{
    public function toArray(): array
    {
        return [
            'list' => $this->items->toArray(),
            'meta' => [
                'current_page' => $this->currentPage(),
                'last_page' => $this->lastPage(),
                'from' => $this->firstItem(),
                'to' => $this->lastItem(),
                'total' => $this->total(),
            ],
        ];
    }
}