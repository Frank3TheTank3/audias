<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\GameController;
use App\Models\Game;

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

Route::get('/home', function () {
    return Inertia::render('AudiasHome');
})->name('home');
/*
Route::get('/tutorial', function () {
    return Inertia::render('Tutorial', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ])->name('tutorial');
});
*/
Route::resources([
    'game' => GameController::class
]);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        $games = Game::all();
        return Inertia::render('Dashboard', [ 'games' => $games]);
    })->name('dashboard');
});

/*
Route::get('/hello', [\App\Http\Controllers\FooController::class, 'index'])->name('foo.index');
*/

