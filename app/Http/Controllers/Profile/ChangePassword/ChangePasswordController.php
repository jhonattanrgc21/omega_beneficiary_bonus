<?php

namespace App\Http\Controllers\Profile\ChangePassword;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ChangePassword\ChangePasswordRequest;
use App\Services\HttpService;


class ChangePasswordController extends Controller
{
    protected $changeUrl = '/cambiarcontrasena';
    protected $registerUrl = '/register';
    protected $apiService;

    public function __construct(HttpService $apiService)
    {
        $this->apiService = $apiService;
    }

    public function change(ChangePasswordRequest $request)
    {
        $contentType = $request->header('Content-Type');
        $accept = $request->header('Accept');
        $authorization = $request->header('Authorization');

        $headers = [
            'Content-Type' => $contentType,
            'Accept' => $accept,
            'Authorization' => $authorization,
        ];

        return $this->apiService->post($this->changeUrl, $request->validated(), $headers);
    }
}
