<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\News\Enums\NewsCategory;
use Illuminate\Http\Request;
class UserCategoryController extends Controller
{
    public function edit(Request $request)
    {
        $user = $request->user();
        // Retrieve all available categories from the NewsCategory class
        $categories = NewsCategory::getCategories();

        // Get the user's selected categories
        $selectedCategories = $user->categories ?? $categories;

        return response()->json([
            'user' => $user,
            'categories' => $categories,
            'selectedCategories' => is_array($selectedCategories) ? $selectedCategories : json_decode($selectedCategories),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();
        $validatedData = $request->validate([
            'categories' => 'required|array',
        ]);

        // Save the updated categories to the usjson_decode($validatedData['categories'])er model
        $user->categories = is_array($validatedData['categories']) ? $validatedData['categories'] : json_decode($validatedData['categories']);
        $user->save();

        return response()->json([
            'message' => 'Categories updated successfully.',
            'user' => $user,
            'selectedCategories' => $user->categories,

        ]);
    }
}
