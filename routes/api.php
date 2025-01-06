<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    // Route::prefix('register')->group(function () {
    //     Route::post('step-one', [RegisterController::class, 'stepOne']);
    //     Route::post('step-two', [RegisterController::class, 'stepTwo']);
    // });
    // Route::prefix('forgot-password')->group(function () {
    //     Route::post('step-one', [ForgotPasswordController::class, 'stepOne']);
    //     Route::post('step-two', [ForgotPasswordController::class, 'stepTwo']);
    // });
});
