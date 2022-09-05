<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return Inertia::render('AudiasHome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});
/*
Route::get('/tutorial', function () {
    return Inertia::render('Tutorial', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ])->name('tutorial');
});
*/
Route::resources([
    'tutorial' => GameController::class,
    'game' => GameController::class
]);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

/*
Route::get('/hello', [\App\Http\Controllers\FooController::class, 'index'])->name('foo.index');
*/

