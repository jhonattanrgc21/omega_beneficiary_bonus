<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\CheckOTPRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\SendOTPRequest;
use App\Services\HttpService;

class AuthController extends Controller
{
    protected $loginUrl = '/login/authenticate';
    protected $sendOTPURL = '/generarotp';
    protected $checkOTPURL = '/checkotp';
    protected $apiService;

    public function __construct(HttpService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function login(LoginRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->loginUrl, $request->validated(), $headers);
    }

    public function sendOTP(SendOTPRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->sendOTPURL, $request->validated(), $headers);
    }

    public function checkOTP(CheckOTPRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
        ];

        return $this->apiService->post($this->checkOTPURL, $request->validated(), $headers);
    }
}
