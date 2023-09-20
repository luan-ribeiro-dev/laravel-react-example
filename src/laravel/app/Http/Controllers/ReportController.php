<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Get the Today's Money, 30 days sales;
     * Today's customers, 30 days customers;
     * Today's orders, 30 days orders;
     * Sales and Money per month from the 5 years (array);
     * Top 10 Seller books of the last 30 days, top 10 revenue books of the last 30 days;
     * 
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $today = date('Y-m-d');

        $todayMoney = Invoice::whereRaw('DATE(created_at) = ?', [$today])
            ->where('status', 'paid')
            ->sum('total_price');

        $last30DaysMoney = Invoice::whereRaw('DATE(created_at) >= ?', [date('Y-m-d', strtotime('-30 days'))])
            ->where('status', 'paid')
            ->sum('total_price');

        $todayOrders = Invoice::whereRaw('DATE(created_at) = ?', [$today])
            ->count();

        $last30DaysOrders = Invoice::whereRaw('DATE(created_at) >= ?', [date('Y-m-d', strtotime('-30 days'))])
            ->count();

        $todayCustomers = User::whereRaw('DATE(created_at) = ?', [$today])
            ->where('role', 'customer')
            ->count();

        $last30DaysCustomers = User::whereRaw('DATE(created_at) >= ?', [date('Y-m-d', strtotime('-30 days'))])
            ->where('role', 'customer')
            ->count();

        // Get the sales per month of each year from the last 5 years
        $salesPerMonth = [];
        for ($i = 4; $i >= 0; $i--) {
            $year = date('Y', strtotime('-' . $i . ' years'));
            $salesPerMonth[$year] = [];
            for ($j = 1; $j <= 12; $j++) {
                $salesPerMonth[$year][$j] = Invoice::whereRaw('YEAR(created_at) = ?', [$year])
                    ->whereRaw('MONTH(created_at) = ?', [$j])
                    ->where('status', 'paid')
                    ->sum('total_price');
            }
        }

        $top10SellerBooksOfLast30Days = Book::selectRaw('title, genre, CAST(sum(quantity) AS SIGNED) as totalQuantity, sum(invoices.total_price) as totalRevenue')
            ->join('book_invoice', 'book_invoice.book_id', '=', 'books.id')
            ->join('invoices', 'book_invoice.invoice_id', '=', 'invoices.id')
            ->whereRaw('DATE(invoices.created_at) >= ?', [date('Y-m-d', strtotime('-30 days'))])
            ->groupBy('book_id')
            ->orderByDesc('totalQuantity')
            ->limit(10)
            ->get();

        $top10RevenueBooksOfLast30Days = Book::selectRaw('title, genre, CAST(sum(quantity) AS SIGNED) as totalQuantity, sum(invoices.total_price) as totalRevenue')
            ->join('book_invoice', 'book_invoice.book_id', '=', 'books.id')
            ->join('invoices', 'book_invoice.invoice_id', '=', 'invoices.id')
            ->whereRaw('DATE(invoices.created_at) >= ?', [date('Y-m-d', strtotime('-30 days'))])
            ->groupBy('book_id')
            ->orderByDesc('totalRevenue')
            ->limit(10)
            ->get();

        return response()->json([
            'todayMoney' => $todayMoney,
            'last30DaysMoney' => $last30DaysMoney,
            'todayOrders' => $todayOrders,
            'last30DaysOrders' => $last30DaysOrders,
            'todayCustomers' => $todayCustomers,
            'last30DaysCustomers' => $last30DaysCustomers,
            'salesPerMonth' => $salesPerMonth,
            'top10SellerBooksOfLast30Days' => $top10SellerBooksOfLast30Days,
            'top10RevenueBooksOfLast30Days' => $top10RevenueBooksOfLast30Days,
        ]);
    }
}
