<?php

use App\Http\Controllers\ActaController;
use App\Http\Controllers\DignidadController;
use App\Http\Controllers\ExportController;
use App\Http\Controllers\StatesController;
use App\Http\Controllers\WebsterController;
use Illuminate\Support\Facades\Route;

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

Route::get('dignidades', [DignidadController::class, 'getDignidades']);

Route::get('dignidades/concejales', [DignidadController::class, 'getConcejales']);

Route::get('dignidades/juntas', [DignidadController::class, 'getJuntas']);

Route::get('dignidades/candidatos', [DignidadController::class, 'getPrefectosAlcaldes']);

Route::get('cantones', [StatesController::class, 'getCantones']);

Route::get('cantones/urbanos', [StatesController::class, 'getCantonesUrbanos']);

Route::get('cantones/rurales', [StatesController::class, 'getCantonesRurales']);

Route::post('parroquias', [StatesController::class, 'getParroquias']);

Route::post('parroquias/rurales', [StatesController::class, 'getParroquiasRurales']);

Route::post('recintos', [StatesController::class, 'getRecintos']);

Route::post('concejales/r/urbanos', [WebsterController::class, 'getConcejalesUrbanos']);

Route::post('concejales/r/rurales', [WebsterController::class, 'getConcejalesRurales']);

Route::post('juntas', [WebsterController::class, 'getJuntas']);

Route::post('resultados/provinciales', [WebsterController::class, 'getProvinciales']);

Route::post('resultados/cantonales', [WebsterController::class, 'getCantonales']);

Route::post('resultados/parroquial', [WebsterController::class, 'getParroquial']);

Route::post('resultados/recintos', [WebsterController::class, 'getRecinto']);

Route::post('actas', [ActaController::class, 'getActas']);

Route::post('actas/todas', [ActaController::class, 'getAllActas']);


Route::post('/actas/export/excel', [ExportController::class, 'actaExportExcel']);

Route::post('/actas/export/excel/todas', [ExportController::class, 'actaAllExportExcel']);

Route::post('/actas/ingresadas/cantonal', [ActaController::class, 'getTotalActasIngresadasCanton']);

Route::post('/juntas/totales/cantonal/urbano', [ActaController::class, 'getTotalJuntasCantonesUrbanos']);

Route::post('/juntas/totales/cantonal/rural', [ActaController::class, 'getTotalJuntasCantonesRurales']);

Route::post('/juntas/totales/parroquiales', [ActaController::class, 'getTotalJuntasParroquia']);

Route::post('/actas/ingresadas/parroquiales', [ActaController::class, 'getTotalActasIngresadasParr']);









