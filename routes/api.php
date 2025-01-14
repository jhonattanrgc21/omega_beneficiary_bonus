<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::prefix('forgot-password')->group(function () {
        Route::post('validateAffiliate', [ForgotPasswordController::class, 'validateAffiliate']);
    });
});
