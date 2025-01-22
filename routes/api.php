<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Profile\ChangePassword\ChangePasswordController;
use App\Http\Middleware\VerifyAuthorization;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('sendOTP', [AuthController::class, 'sendOTP']);
    Route::post('checkOTP', [AuthController::class, 'checkOTP']);
    Route::prefix('forgot-password')->group(function () {
        Route::post('validateAffiliate', [ForgotPasswordController::class, 'validateAffiliate']);
        Route::post('answerChallenge', [ForgotPasswordController::class, 'answerChallenge']);
        Route::post('changePassword', [ForgotPasswordController::class, 'changePassword']);
    });
    Route::prefix('register')->group(function () {
        Route::post('verifyAffiliate', [RegisterController::class, 'verifyAffiliate']);
        Route::get('getQuestionsList', [RegisterController::class, 'getQuestionsList']);
        Route::post('save', [RegisterController::class, 'register']);
    });
});

Route::middleware([VerifyAuthorization::class])->prefix('profile')->group(function () {
    Route::prefix('change-password')->group(function () {
        Route::post('sendOTP',  [AuthController::class, 'sendOTP']);
        Route::post('checkOTP', [AuthController::class, 'checkOTP']);
        Route::post('change', [ChangePasswordController::class, 'change']);
    });
});
