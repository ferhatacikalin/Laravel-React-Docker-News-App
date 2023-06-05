<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Article;
use App\News\Enums\NewsCategory;
class NewsController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $selectedCategories = $user->categories ? json_decode($user->categories) : NewsCategory::getCategories();
        $perPage = $request->query('per_page', 20); // Number of articles per page
        $page = $request->query('page', 1); // Current page
        $keyword = $request->query('keyword'); // Search keyword
        $startDate = $request->query('start_date'); // Start date for filtering
        $endDate = $request->query('end_date'); // End date for filtering
        $category = $request->query('category'); // Category for filtering
        $source = $request->query('source'); // Source for filtering

        $articlesQuery = Article::orderBy('published_at', 'desc');

        if (!empty($selectedCategories)) {
            $articlesQuery->whereIn('category', $selectedCategories);
        }

        if ($keyword) {
            $articlesQuery->where(function ($query) use ($keyword) {
                $query->where('title', 'LIKE', "%$keyword%")
                    ->orWhere('description', 'LIKE', "%$keyword%");
            });
        }

        if ($startDate) {
            $articlesQuery->whereDate('published_at', '>=', $startDate);
        }

        if ($endDate) {
            $articlesQuery->whereDate('published_at', '<=', $endDate);
        }

        if ($category) {
            $articlesQuery->where('category', $category);
        }

        if ($source) {
            $articlesQuery->where('source', $source);
        }

        $articles = $articlesQuery->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'articles' => $articles->items(),
            'pagination' => [
                'current_page' => $articles->currentPage(),
                'last_page' => $articles->lastPage(),
                'per_page' => $articles->perPage(),
                'total' => $articles->total(),
            ],
        ]);
    }

}
