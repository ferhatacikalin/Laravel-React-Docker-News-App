<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\UserCategoryController;
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:sanctum'], function() {
    Route::get('/user', function (Request $request) {
        return ['data' => $request->user()];
    });
    Route::get('/articles', [NewsController::class, 'index'])->name('news.index');
    Route::get('/categories/edit', [UserCategoryController::class, 'edit'])->name('user.categories.edit');
    Route::post('/categories/update', [UserCategoryController::class, 'update'])->name('user.categories.update');
    Route::delete('/logout', [AuthController::class,'logout']);
});

