<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Services\HttpService;

class AuthController extends Controller
{
    protected $loginUrl = '/login/authenticate';
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
}
