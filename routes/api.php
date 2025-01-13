<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ForgotPasswordController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::prefix('forgot-password')->group(function () {
        Route::post('validateAffiliate', [ForgotPasswordController::class, 'validateAffiliate']);
    });
});
