<?php

use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\TechnologyController;
use App\Http\Controllers\Admin\TypeController;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\AuthenticatedSessionController;
use Laravel\Fortify\Http\Controllers\RegisteredUserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function(Request $request){
    return $request->user();
});

Route::middleware('auth:sanctum')->post('logout', [AuthenticatedSessionController::class, 'destroy']);

// Route::middleware('auth:sanctum')
// ->prefix('user')
// ->name('admin.')
// ->group(function () {

// Route::resource('/dashboard/progetti', ProjectController::class);
// });

Route::resource('dashboard/progetti', ProjectController::class);

Route::get('/dashboard/progetti/{id}', [ProjectController::class, 'show']);

Route::resource('dashboard/tipi', TypeController::class);
Route::post('dashboard/tipi', [TypeController::class, 'store']);
Route::put('dashboard/tipi/{id}', [TypeController::class, 'update']);

Route::resource('dashboard/tecnologie', TechnologyController::class);
Route::post('dashboard/tecnologie', [TechnologyController::class, 'store']);

Route::post('dashboard/nuovo-progetto', [ProjectController::class, 'store']);


Route::post('register', [RegisteredUserController::class, 'store' ]);
Route::post('login', [AuthenticatedSessionController::class, 'store']);



